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

  constructor(private photoPackService: PhotoPackService) { }

  ngOnInit(): void {
    this.loadPhotoPacks();
  }

  loadPhotoPacks(): void {
    this.isLoading = true;
    this.photoPackService.getPhotoPacks(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.status === '000') {
          this.photoPacks = response.data || [];
          this.filteredPhotoPacks = this.photoPacks;
          this.totalPages = response.totalPages || 0;
          this.totalElements = response.totalElements || 0;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading photo packs:', error);
        this.isLoading = false;
        // Fallback to mock data if API fails
        this.loadMockData();
      }
    });
  }

  onSearchChange(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPhotoPacks = this.photoPacks;
    } else {
      this.isLoading = true;
      this.photoPackService.searchPhotoPacks(this.searchQuery, 1, this.pageSize).subscribe({
        next: (response) => {
          if (response && response.status === '000') {
            this.filteredPhotoPacks = response.data || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error searching photo packs:', error);
          // Fallback to local filtering
          this.filteredPhotoPacks = this.photoPacks.filter(pack =>
            pack.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            pack.description.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.isLoading = false;
        }
      });
    }
  }

  private loadMockData(): void {
    // Fallback mock data if API is not available
    this.photoPacks = [
      {
        id: 'halloween',
        title: 'Halloween',
        description: 'Get into the spooky spirit with fun and festive Halloween costumes! Transform yourself into playful, mysterious, and creative characters that capture the excitement of Halloween with a dash of fright',
        icon: '🎃',
        photoCount: 20,
        usageCount: 17,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'seasonal',
        status: 'ACTIVE',
        position: 1,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'diwali',
        title: 'Diwali',
        description: 'Celebrate the Festival of Lights with a vibrant and festive Diwali-themed photo shoot! Capture the joy and warmth of this special occasion with traditional outfits, beautiful rangoli, and glowing diyas',
        icon: '🪔',
        photoCount: 20,
        usageCount: 2,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'cultural',
        status: 'ACTIVE',
        position: 2,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'day-of-dead',
        title: 'Day of the Dead (Día de Los Muertos)',
        description: 'Honor the beautiful tradition of Día de Los Muertos with stunning sugar skull makeup, vibrant marigolds, and festive decorations that celebrate life and remember loved ones.',
        icon: '💀',
        photoCount: 25,
        usageCount: 8,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'cultural',
        status: 'ACTIVE',
        position: 3,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'tinder',
        title: 'Tinder',
        description: 'Create eye-catching dating profile photos that stand out and get more matches! From casual outdoor shots to stylish indoor portraits, make your profile irresistible.',
        icon: '🔥',
        photoCount: 30,
        usageCount: 12,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'dating',
        status: 'ACTIVE',
        position: 4,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'linkedin',
        title: 'LinkedIn headshots',
        description: 'Your LinkedIn profile is your digital first impression—make it count with a studio-quality professional headshot that enhances your credibility and personal brand.',
        icon: '📷',
        photoCount: 25,
        usageCount: 15,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'professional',
        status: 'ACTIVE',
        position: 5,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'instagram',
        title: 'Instagram',
        description: 'Create stunning Instagram-worthy photos that will make your feed pop! From lifestyle shots to creative portraits, get the perfect content for your social media.',
        icon: '📷',
        photoCount: 36,
        usageCount: 24,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'social',
        status: 'ACTIVE',
        position: 6,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      }
    ];
    this.filteredPhotoPacks = this.photoPacks;
  }

  selectPhotoPack(pack: PhotoPack): void {
    console.log('Selected photo pack:', pack);
    // TODO: Implement photo pack selection logic
  }

  trackByPackId(index: number, pack: PhotoPack): string {
    return pack.id;
  }
}
