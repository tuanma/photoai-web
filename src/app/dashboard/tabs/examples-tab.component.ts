import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-examples-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examples-tab.component.html',
  styleUrls: ['./examples-tab.component.scss']
})
export class ExamplesTabComponent implements OnInit {

  examples = [
    {
      id: 1,
      title: 'Professional Headshots',
      category: 'Business',
      image: '/assets/images/placeholder.svg',
      description: 'High-quality professional headshots for LinkedIn, business cards, and corporate profiles.',
      tags: ['professional', 'business', 'headshot']
    },
    {
      id: 2,
      title: 'Creative Portraits',
      category: 'Creative',
      image: '/assets/images/placeholder.svg',
      description: 'Artistic and creative portrait photography with unique lighting and composition.',
      tags: ['creative', 'artistic', 'portrait']
    },
    {
      id: 3,
      title: 'Lifestyle Photos',
      category: 'Lifestyle',
      image: '/assets/images/placeholder.svg',
      description: 'Natural, candid lifestyle photos perfect for social media and personal branding.',
      tags: ['lifestyle', 'natural', 'social']
    },
    {
      id: 4,
      title: 'Fashion Photography',
      category: 'Fashion',
      image: '/assets/images/placeholder.svg',
      description: 'Stylish fashion photography with professional styling and makeup.',
      tags: ['fashion', 'style', 'glamour']
    }
  ];

  selectedCategory = 'all';

  constructor() { }

  ngOnInit(): void {
  }

  selectExample(example: any): void {
    console.log('Selected example:', example);
    // TODO: Implement example selection logic
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredExamples() {
    if (this.selectedCategory === 'all') {
      return this.examples;
    }
    return this.examples.filter(example => 
      example.category.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  trackByExampleId(index: number, example: any): number {
    return example.id;
  }
}
