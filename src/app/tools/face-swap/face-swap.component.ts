import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-face-swap',
  templateUrl: './face-swap.component.html',
  styleUrls: ['./face-swap.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FaceSwapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
