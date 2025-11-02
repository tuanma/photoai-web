import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraService, Camera } from '../../_services/camera.service';

@Component({
  selector: 'app-camera-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './camera-tab.component.html',
  styleUrls: ['./camera-tab.component.scss']
})
export class CameraTabComponent implements OnInit {

  searchQuery = '';
  cameras: Camera[] = [];
  filteredCameras: Camera[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 24;

  constructor(private cameraService: CameraService) { }

  ngOnInit(): void {
    this.loadCameras();
  }

  loadCameras(): void {
    this.isLoading = true;
    this.cameraService.getCameras(this.currentPage, this.pageSize, 'ACTIVE').subscribe({
      next: (response: any) => {
        console.log('Cameras API response:', response);
        
        if (response && (response.status === '000' || response.status === '200' || response.statusCode === 200)) {
          let camerasList: Camera[] = [];
          
          if (response.data?.list && Array.isArray(response.data.list)) {
            camerasList = response.data.list;
          } else if (response.data && Array.isArray(response.data)) {
            camerasList = response.data;
          } else if (response.list && Array.isArray(response.list)) {
            camerasList = response.list;
          }
          
          this.cameras = camerasList;
          this.filteredCameras = this.cameras;
          this.filterBySearch();
        } else {
          console.error('Failed to load cameras:', response);
          this.cameras = [];
          this.filteredCameras = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cameras:', error);
        this.cameras = [];
        this.filteredCameras = [];
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.filterBySearch();
  }

  filterBySearch(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredCameras = this.cameras;
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredCameras = this.cameras.filter(camera => {
        const manualPrompt = (camera.manualPrompt || '').toLowerCase();
        const template = (camera.template || '').toLowerCase();
        const modelId = (camera.modelId || '').toLowerCase();
        return manualPrompt.includes(query) || template.includes(query) || modelId.includes(query);
      });
    }
  }

  getImageUrl(camera: Camera): string {
    if (camera.photoUrl) {
      if (typeof camera.photoUrl === 'string') {
        return camera.photoUrl;
      } else if (camera.photoUrl && typeof camera.photoUrl === 'object') {
        return (camera.photoUrl as any).photo_url || (camera.photoUrl as any).url || '';
      }
    }
    return '/assets/images/placeholder.svg';
  }

  getLabel(camera: Camera): { text: string; color: string } {
    // Check for Hyper Realism (realism = 1)
    if (camera.realism === 1) {
      return { text: 'HYPER REALISM', color: '#ff6b35' }; // Orange/pink color
    }
    // Check for FLUX (flux exists and > 0)
    if (camera.flux && camera.flux > 0) {
      return { text: 'FLUX', color: '#10b981' }; // Green color
    }
    return { text: '', color: '' };
  }

  getTimeAgo(camera: Camera): string {
    if (!camera.epochFinished) {
      return 'Unknown';
    }
    
    const finishedTime = camera.epochFinished * 1000; // Convert to milliseconds
    const now = Date.now();
    const diffMs = now - finishedTime;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1d ago';
    } else {
      return `${diffDays}d ago`;
    }
  }

  getDuration(camera: Camera): string {
    if (!camera.epochQueued || !camera.epochFinished) {
      return 'Unknown';
    }
    
    const durationSeconds = camera.epochFinished - camera.epochQueued;
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    
    if (minutes === 0) {
      return `took ${seconds}s`;
    } else {
      return `took ${minutes}m${seconds.toString().padStart(2, '0')}s`;
    }
  }

  getDisplayName(camera: Camera): string {
    return camera.template || camera.modelId || 'Untitled';
  }

  trackByCameraId(index: number, camera: Camera): any {
    return camera?.id || camera?.photoId || index;
  }

  selectCamera(camera: Camera): void {
    console.log('Selected camera:', camera);
    // TODO: Implement camera selection logic
  }
}
