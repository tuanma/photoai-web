import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'background-removal',
    pathMatch: 'full'
  },
  {
    path: 'background-removal',
    loadComponent: () => import('./background-removal/background-removal.component').then(m => m.BackgroundRemovalComponent)
  },
  {
    path: 'upscaling',
    loadComponent: () => import('./upscaling/upscaling.component').then(m => m.UpscalingComponent)
  },
  {
    path: 'ai-generation',
    loadComponent: () => import('./ai-generation/ai-generation.component').then(m => m.AiGenerationComponent)
  },
  {
    path: 'enhancement',
    loadComponent: () => import('./enhancement/enhancement.component').then(m => m.EnhancementComponent)
  },
  {
    path: 'object-removal',
    loadComponent: () => import('./object-removal/object-removal.component').then(m => m.ObjectRemovalComponent)
  },
  {
    path: 'face-swap',
    loadComponent: () => import('./face-swap/face-swap.component').then(m => m.FaceSwapComponent)
  }
];
