import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos-tab.component.html',
  styleUrls: ['./videos-tab.component.scss']
})
export class VideosTabComponent implements OnInit {

  videos = [
    {
      id: 1,
      title: 'Professional Introduction',
      duration: '30s',
      thumbnail: '/assets/images/placeholder.svg',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Product Demo',
      duration: '45s',
      thumbnail: '/assets/images/placeholder.svg',
      status: 'processing'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  createVideo(): void {
    console.log('Creating new video...');
    // TODO: Implement video creation logic
  }

  selectVideo(video: any): void {
    console.log('Selected video:', video);
    // TODO: Implement video selection logic
  }

  trackByVideoId(index: number, video: any): number {
    return video.id;
  }
}
