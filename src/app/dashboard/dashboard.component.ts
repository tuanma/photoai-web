import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhotoPacksTabComponent } from './tabs/photo-packs-tab.component';
import { ExamplesTabComponent } from './tabs/examples-tab.component';
import { CameraTabComponent } from './tabs/camera-tab.component';
import { VideosTabComponent } from './tabs/videos-tab.component';
import { SavedTabComponent } from './tabs/saved-tab.component';
import { DeletedTabComponent } from './tabs/deleted-tab.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    PhotoPacksTabComponent,
    ExamplesTabComponent,
    CameraTabComponent,
    VideosTabComponent,
    SavedTabComponent,
    DeletedTabComponent
  ]
})
export class DashboardComponent implements OnInit {
  
  activeTab = 'photo-packs';
  aiModelExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleAiModel(): void {
    this.aiModelExpanded = !this.aiModelExpanded;
  }

  upgrade(): void {
    console.log('Upgrade subscription');
    // TODO: Navigate to pricing page
  }
}
