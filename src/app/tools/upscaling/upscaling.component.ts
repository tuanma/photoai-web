import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upscaling',
  templateUrl: './upscaling.component.html',
  styleUrls: ['./upscaling.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UpscalingComponent implements OnInit {
  
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  processedUrl: string | null = null;
  isProcessing = false;
  processingProgress = 0;
  selectedScale = 2;
  originalSize = '';
  newSize = '';

  scaleOptions = [
    { value: 2, label: '2x (Double)', description: 'Good for small images' },
    { value: 4, label: '4x (Quadruple)', description: 'Best for most use cases' },
    { value: 8, label: '8x (Ultra)', description: 'Maximum quality' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.createPreview(file);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.createPreview(files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private createPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
      this.getImageDimensions(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  private getImageDimensions(src: string): void {
    const img = new Image();
    img.onload = () => {
      this.originalSize = `${img.width} × ${img.height}`;
      this.newSize = `${img.width * this.selectedScale} × ${img.height * this.selectedScale}`;
    };
    img.src = src;
  }

  onScaleChange(): void {
    if (this.previewUrl) {
      const img = new Image();
      img.onload = () => {
        this.originalSize = `${img.width} × ${img.height}`;
        this.newSize = `${img.width * this.selectedScale} × ${img.height * this.selectedScale}`;
      };
      img.src = this.previewUrl;
    }
  }

  processImage(): void {
    if (!this.selectedFile) return;

    this.isProcessing = true;
    this.processingProgress = 0;

    // Simulate AI processing
    const interval = setInterval(() => {
      this.processingProgress += Math.random() * 15;
      if (this.processingProgress >= 100) {
        this.processingProgress = 100;
        clearInterval(interval);
        this.completeProcessing();
      }
    }, 300);
  }

  private completeProcessing(): void {
    // Simulate processed result
    setTimeout(() => {
      this.processedUrl = this.previewUrl; // In real app, this would be the upscaled image
      this.isProcessing = false;
    }, 1500);
  }

  downloadResult(): void {
    if (this.processedUrl) {
      const link = document.createElement('a');
      link.href = this.processedUrl;
      link.download = `upscaled-${this.selectedScale}x.png`;
      link.click();
    }
  }

  reset(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.processedUrl = null;
    this.isProcessing = false;
    this.processingProgress = 0;
    this.originalSize = '';
    this.newSize = '';
  }
}
