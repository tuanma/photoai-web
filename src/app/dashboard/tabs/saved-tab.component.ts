import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-tab.component.html',
  styleUrls: ['./saved-tab.component.scss']
})
export class SavedTabComponent implements OnInit {

  savedItems = [
    {
      id: 1,
      title: 'Professional Headshot',
      type: 'photo',
      thumbnail: '/assets/images/placeholder.svg',
      savedDate: new Date('2024-01-15'),
      tags: ['professional', 'business']
    },
    {
      id: 2,
      title: 'Creative Portrait',
      type: 'photo',
      thumbnail: '/assets/images/placeholder.svg',
      savedDate: new Date('2024-01-14'),
      tags: ['creative', 'artistic']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  removeFromSaved(item: any): void {
    console.log('Removing from saved:', item);
    // TODO: Implement remove logic
  }

  downloadItem(item: any): void {
    console.log('Downloading item:', item);
    // TODO: Implement download logic
  }

  trackByItemId(index: number, item: any): number {
    return item.id;
  }
}
