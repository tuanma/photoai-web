import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  buttonClass: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PricingComponent implements OnInit {
  
  billingCycle = 'monthly';
  plans: PricingPlan[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializePlans();
  }

  private initializePlans(): void {
    this.plans = [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for trying out PhotoAI',
        features: [
          '5 AI edits per month',
          'Basic background removal',
          'Standard quality output',
          'Community support',
          'Watermarked results'
        ],
        isPopular: false,
        buttonText: 'Get Started Free',
        buttonClass: 'btn-outline-primary'
      },
      {
        id: 'pro',
        name: 'Pro',
        price: this.billingCycle === 'monthly' ? 19 : 190,
        period: this.billingCycle === 'monthly' ? 'month' : 'year',
        description: 'Best for professionals and creators',
        features: [
          'Unlimited AI edits',
          'All editing tools included',
          'High quality output',
          'Batch processing',
          'Priority support',
          'No watermarks',
          'Commercial usage rights',
          'API access'
        ],
        isPopular: true,
        buttonText: 'Start Pro Trial',
        buttonClass: 'btn-primary'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: this.billingCycle === 'monthly' ? 99 : 990,
        period: this.billingCycle === 'monthly' ? 'month' : 'year',
        description: 'For teams and large organizations',
        features: [
          'Everything in Pro',
          'Team management',
          'Custom integrations',
          'Dedicated support',
          'SLA guarantee',
          'On-premise deployment',
          'Custom AI models',
          'Volume discounts'
        ],
        isPopular: false,
        buttonText: 'Contact Sales',
        buttonClass: 'btn-outline-primary'
      }
    ];
  }

  toggleBilling(): void {
    this.billingCycle = this.billingCycle === 'monthly' ? 'yearly' : 'monthly';
    this.initializePlans();
  }

  selectPlan(planId: string): void {
    console.log('Selected plan:', planId);
    // Handle plan selection logic here
  }

  getSavingsPercentage(): number {
    return 17; // 17% savings for yearly billing
  }
}
