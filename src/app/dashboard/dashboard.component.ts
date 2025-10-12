import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhotoPackService, PhotoPack } from '../_services/photo-pack.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  
  currentCredits = 34;
  bonusCredits = 2000;
  selectedModel = 'Default Model';
  selectedStyle = 'Default Style';
  hyperRealismEnabled = true;
  photoCount = 1;
  searchQuery = '';
  
  photoPacks: PhotoPack[] = [];
  filteredPhotoPacks: PhotoPack[] = [];
  activeTab = 'photo-packs';
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
        usageCount: 9,
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
        usageCount: 3,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'cultural',
        status: 'ACTIVE',
        position: 2,
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
        position: 3,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'tinder',
        title: 'Tinder',
        description: 'Look your best while staying true to who you are. Take photos with a variety of poses, playful expressions, and vibrant colors to make your dating profile stand out.',
        icon: '🔥',
        photoCount: 29,
        usageCount: 41,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'dating',
        status: 'ACTIVE',
        position: 4,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'instagram',
        title: 'Instagram',
        description: 'Take engaging and visually stunning photos that feature you as an Instagram influencer. Boost your confidence, likes and followers with captivating images.',
        icon: '📷',
        photoCount: 36,
        usageCount: 39,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'social',
        status: 'ACTIVE',
        position: 5,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: 'ceo',
        title: 'CEO Headshots',
        description: 'Project authority and leadership with professional, AI-generated CEO headshots. Perfect for annual reports, investor presentations, and executive profiles.',
        icon: '📷',
        photoCount: 32,
        usageCount: 12,
        previewImages: ['/assets/images/placeholder.svg', '/assets/images/placeholder.svg'],
        category: 'professional',
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

  toggleHyperRealism(): void {
    this.hyperRealismEnabled = !this.hyperRealismEnabled;
  }

  generatePhotos(): void {
    console.log('Generating photos...', {
      photoCount: this.photoCount,
      hyperRealism: this.hyperRealismEnabled,
      model: this.selectedModel,
      style: this.selectedStyle
    });
    // TODO: Implement photo generation logic
  }

  buyCredits(): void {
    console.log('Buy more credits');
    // TODO: Navigate to pricing page
  }

  upgrade(): void {
    console.log('Upgrade subscription');
    // TODO: Navigate to pricing page
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
