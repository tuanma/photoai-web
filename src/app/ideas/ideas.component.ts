import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IdeasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
