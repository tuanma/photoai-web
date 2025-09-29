import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-object-removal',
  templateUrl: './object-removal.component.html',
  styleUrls: ['./object-removal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ObjectRemovalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
