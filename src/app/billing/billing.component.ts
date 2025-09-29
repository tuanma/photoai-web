import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BillingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
