import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-generation',
  templateUrl: './ai-generation.component.html',
  styleUrls: ['./ai-generation.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AiGenerationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
