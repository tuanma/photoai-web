import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enhancement',
  templateUrl: './enhancement.component.html',
  styleUrls: ['./enhancement.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EnhancementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
