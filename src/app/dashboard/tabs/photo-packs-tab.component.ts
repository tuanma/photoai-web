import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoPackService, PhotoPack } from '../../_services/photo-pack.service';

@Component({
  selector: 'app-photo-packs-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photo-packs-tab.component.html',
  styleUrls: ['./photo-packs-tab.component.scss']
})
export class PhotoPacksTabComponent implements OnInit {
  
  searchQuery = '';
  photoPacks: PhotoPack[] = [];
  filteredPhotoPacks: PhotoPack[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 20;
  totalPages = 0;
  totalElements = 0;
  selectedPackId: string | null = null;

  constructor(private photoPackService: PhotoPackService) { }

  ngOnInit(): void {
    this.loadPhotoPacks();
  }

  loadPhotoPacks(): void {
    this.isLoading = true;
    this.photoPackService.getPhotoPacks(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        console.log('Photo packs API response:', response);
        
        // API returns: { status, message, list, paging }
        // Check both '000' and '200' status codes
        if (response && (response.status === '000' || response.status === '200' || response.statusCode === 200)) {
          // Try to get list from response.list (API format) or response.data (legacy format)
          const photoPacksList = response.data.list || response.data || [];
          this.photoPacks = Array.isArray(photoPacksList) ? photoPacksList : [];
          this.filteredPhotoPacks = this.photoPacks;
          
          // Get paging info from response.paging object
          if (response.paging) {
            this.totalPages = response.paging.totalPages || 0;
            this.totalElements = response.paging.totalRows || 0;
          } else {
            // Fallback to direct properties
            this.totalPages = response.totalPages || 0;
            this.totalElements = response.totalElements || 0;
          }
          
          console.log('Loaded photo packs:', this.photoPacks.length);
        } else {
          console.warn('Unexpected response status:', response?.status);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading photo packs:', error);
        this.photoPacks = [];
        this.filteredPhotoPacks = [];
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPhotoPacks = this.photoPacks;
    } else {
      this.isLoading = true;
      this.photoPackService.searchPhotoPacks(this.searchQuery, 1, this.pageSize).subscribe({
        next: (response: any) => {
          console.log('Search API response:', response);
          
          // API returns: { status, message, list, paging }
          if (response && (response.status === '000' || response.status === '200' || response.statusCode === 200)) {
            const photoPacksList = response.data.list || [];
            this.filteredPhotoPacks = Array.isArray(photoPacksList) ? photoPacksList : [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error searching photo packs:', error);
          // Fallback to local filtering
          this.filteredPhotoPacks = this.photoPacks.filter(pack => {
            const title = pack.name || pack.title || '';
            const description = pack.description || '';
            const query = this.searchQuery.toLowerCase();
            return title.toLowerCase().includes(query) || description.toLowerCase().includes(query);
          });
          this.isLoading = false;
        }
      });
    }
  }

  selectPhotoPack(pack: PhotoPack): void {
    this.selectedPackId = pack.id;
    console.log('Selected photo pack:', pack);
    // TODO: Implement photo pack selection logic
  }

  getPreviewImages(pack: any): string[] {
    // Try to get images from samples first, then previewImages
    let images: string[] = [];
    
    if (pack.samples && Array.isArray(pack.samples)) {
      images = pack.samples.slice(0, 2).map((sample: any) => {
        if (typeof sample === 'string') {
          return sample;
        } else if (sample && typeof sample === 'object') {
          return sample.photoUrl || sample.photo_url || sample.url || '';
        }
        return '';
      }).filter((url: string) => url);
    }
    
    if (images.length === 0 && pack.samplesJson) {
      try {
        const samples = typeof pack.samplesJson === 'string' 
          ? JSON.parse(pack.samplesJson)
          : pack.samplesJson;
        if (Array.isArray(samples)) {
          images = samples.slice(0, 2).map((sample: any) => {
            if (sample && typeof sample === 'object') {
              return sample.photoUrl || sample.photo_url || sample.url || '';
            }
            return '';
          }).filter((url: string) => url);
        }
      } catch (e) {
        console.warn('Failed to parse samplesJson:', e);
      }
    }
    
    // Fallback to previewImages
    if (images.length === 0 && pack.previewImages) {
      if (Array.isArray(pack.previewImages)) {
        images = pack.previewImages.slice(0, 2);
      } else if (typeof pack.previewImages === 'string') {
        try {
          const previewImages = JSON.parse(pack.previewImages);
          if (Array.isArray(previewImages)) {
            images = previewImages.slice(0, 2).map((img: any) => {
              if (typeof img === 'string') {
                return img;
              } else if (img && typeof img === 'object') {
                return img.photo_url || img.url || img.photoUrl || '';
              }
              return '';
            }).filter((url: string) => url);
          }
        } catch (e) {
          // If it's not JSON, use as single URL
          images = [pack.previewImages].slice(0, 2);
        }
      }
    }
    
    // Ensure we have at least 2 images (use placeholder if needed)
    while (images.length < 2) {
      images.push('/assets/images/placeholder.svg');
    }
    
    return images.slice(0, 2);
  }

  trackByPackId(index: number, pack: PhotoPack): string {
    return pack.id;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
