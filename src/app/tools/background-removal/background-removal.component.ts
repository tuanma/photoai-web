import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-background-removal',
  templateUrl: './background-removal.component.html',
  styleUrls: ['./background-removal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BackgroundRemovalComponent implements OnInit {
  
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  processedUrl: string | null = null;
  isProcessing = false;
  processingProgress = 0;

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
    };
    reader.readAsDataURL(file);
  }

  processImage(): void {
    if (!this.selectedFile) return;

    this.isProcessing = true;
    this.processingProgress = 0;

    // Simulate AI processing
    const interval = setInterval(() => {
      this.processingProgress += Math.random() * 20;
      if (this.processingProgress >= 100) {
        this.processingProgress = 100;
        clearInterval(interval);
        this.completeProcessing();
      }
    }, 200);
  }

  private completeProcessing(): void {
    // Simulate processed result
    setTimeout(() => {
      this.processedUrl = this.previewUrl; // In real app, this would be the processed image
      this.isProcessing = false;
    }, 1000);
  }

  downloadResult(): void {
    if (this.processedUrl) {
      const link = document.createElement('a');
      link.href = this.processedUrl;
      link.download = 'background-removed.png';
      link.click();
    }
  }

  reset(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.processedUrl = null;
    this.isProcessing = false;
    this.processingProgress = 0;
  }
}
