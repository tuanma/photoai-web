import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.scss']
})
export class PricingSectionComponent {
  @Output() setPricing = new EventEmitter<'monthly' | 'yearly'>();
  
  isYearly: boolean = true;

  onSetPricing(period: 'monthly' | 'yearly') {
    this.isYearly = period === 'yearly';
    this.setPricing.emit(period);
  }
}
