import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-camera-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './camera-tab.component.html',
  styleUrls: ['./camera-tab.component.scss']
})
export class CameraTabComponent implements OnInit {

  selectedModel = 'Default Model';
  selectedStyle = 'Default Style';
  hyperRealismEnabled = true;
  photoCount = 1;

  models = [
    { id: 'default', name: 'Default Model', description: 'Balanced quality and speed' },
    { id: 'premium', name: 'Premium Model', description: 'Highest quality output' },
    { id: 'fast', name: 'Fast Model', description: 'Quick generation' }
  ];

  styles = [
    { id: 'default', name: 'Default Style', description: 'Natural and realistic' },
    { id: 'artistic', name: 'Artistic Style', description: 'Creative and stylized' },
    { id: 'professional', name: 'Professional Style', description: 'Business and formal' }
  ];

  constructor() { }

  ngOnInit(): void {
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

  startCamera(): void {
    console.log('Starting camera...');
    // TODO: Implement camera functionality
  }

  decreasePhotoCount(): void {
    this.photoCount = Math.max(1, this.photoCount - 1);
  }

  increasePhotoCount(): void {
    this.photoCount = Math.min(10, this.photoCount + 1);
  }
}
