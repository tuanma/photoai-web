import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deleted-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deleted-tab.component.html',
  styleUrls: ['./deleted-tab.component.scss']
})
export class DeletedTabComponent implements OnInit {

  deletedItems = [
    {
      id: 1,
      title: 'Old Portrait',
      type: 'photo',
      thumbnail: '/assets/images/placeholder.svg',
      deletedDate: new Date('2024-01-10'),
      tags: ['old', 'test']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  restoreItem(item: any): void {
    console.log('Restoring item:', item);
    // TODO: Implement restore logic
  }

  permanentlyDelete(item: any): void {
    console.log('Permanently deleting item:', item);
    // TODO: Implement permanent delete logic
  }

  clearAll(): void {
    console.log('Clearing all deleted items');
    // TODO: Implement clear all logic
  }

  trackByItemId(index: number, item: any): number {
    return item.id;
  }
}
