import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExampleService, Example } from '../../_services/example.service';

@Component({
  selector: 'app-examples-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examples-tab.component.html',
  styleUrls: ['./examples-tab.component.scss']
})
export class ExamplesTabComponent implements OnInit {

  searchQuery = '';
  examples: Example[] = [];
  filteredExamples: Example[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 24; // Display 24 examples (2 rows x 12 columns or flexible grid)

  constructor(private exampleService: ExampleService) { }

  ngOnInit(): void {
    this.loadExamples();
  }

  loadExamples(): void {
    this.isLoading = true;
    this.exampleService.getExamples(this.currentPage, this.pageSize, 'ACTIVE').subscribe({
      next: (response: any) => {
        console.log('Examples API response:', response);
        
        if (response && (response.status === '000' || response.status === '200' || response.statusCode === 200)) {
          // Try different response formats
          let examplesList: Example[] = [];
          
          if (response.data?.list && Array.isArray(response.data.list)) {
            examplesList = response.data.list;
          } else if (response.data && Array.isArray(response.data)) {
            examplesList = response.data;
          } else if (response.list && Array.isArray(response.list)) {
            examplesList = response.list;
          }
          
          this.examples = examplesList;
          this.filteredExamples = this.examples;
          this.filterBySearch();
        } else {
          console.error('Failed to load examples:', response);
          this.examples = [];
          this.filteredExamples = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading examples:', error);
        this.examples = [];
        this.filteredExamples = [];
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.filterBySearch();
  }

  filterBySearch(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredExamples = this.examples;
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredExamples = this.examples.filter(example => {
        const prompt = (example.prompt || '').toLowerCase();
        const manualPrompt = (example.manualPrompt || '').toLowerCase();
        const template = (example.template || '').toLowerCase();
        return prompt.includes(query) || manualPrompt.includes(query) || template.includes(query);
      });
    }
  }

  selectExample(example: Example): void {
    console.log('Selected example:', example);
    // TODO: Implement example selection logic (e.g., use for generating photo)
  }

  getImageUrl(example: Example): string {
    if (example.photoUrl) {
      // Handle different URL formats
      if (typeof example.photoUrl === 'string') {
        return example.photoUrl;
      } else if (example.photoUrl && typeof example.photoUrl === 'object') {
        // Handle object format {photo_url: '...'} or {url: '...'}
        return (example.photoUrl as any).photo_url || (example.photoUrl as any).url || '';
      }
    }
    return '/assets/images/placeholder.svg';
  }

  getPromptText(example: Example): string {
    return example.prompt || example.manualPrompt || 'No prompt available';
  }

  trackByExampleId(index: number, example: Example): any {
    return example?.id || index;
  }
}
