import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentService, PaymentRequest, PaymentResponse } from '../_services';
import { AuthenticationService } from '../_services';
import { config } from '../../environments/environment';
import { SectionsModule } from '../sections/sections.module';

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
  imports: [CommonModule, FormsModule, SectionsModule]
})
export class PricingComponent implements OnInit {
  
  billingCycle = 'monthly';
  plans: PricingPlan[] = [];
  
  // Stripe related properties
  stripePromise = loadStripe(config.stripe);
  isProcessingPayment = false;
  paymentError: string | null = null;
  paymentSuccess: string | null = null;

  constructor(
    private paymentService: PaymentService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializePlans();
    this.checkPaymentResult();
  }

  private checkPaymentResult(): void {
    // Check for success/cancel parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const plan = urlParams.get('plan');

    if (success === 'true') {
      // Payment successful
      console.log('Payment successful for plan:', plan);
      // You can show a success message or redirect to billing page
      setTimeout(() => {
        this.router.navigate(['/billing'], { 
          queryParams: { 
            success: 'true',
            plan: plan 
          } 
        });
      }, 2000);
    } else if (canceled === 'true') {
      // Payment canceled
      console.log('Payment canceled');
      this.paymentError = 'Payment was canceled. You can try again anytime.';
    }
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

  async selectPlan(planId: string): Promise<void> {
    // Clear any previous errors and success messages
    this.paymentError = null;
    this.paymentSuccess = null;
    
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) return;

    // Check if user is logged in for paid plans
    if (plan.id !== 'free' && !this.authenticationService.currentUserValue) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/pricing' } });
      return;
    }

    if (plan.id === 'free') {
      // Handle free plan
      this.handleFreePlan(plan);
    } else if (plan.id === 'enterprise') {
      // Handle enterprise plan - contact sales
      this.handleEnterprisePlan(plan);
    } else {
      // Handle paid plans with Stripe Checkout
      await this.handlePaidPlan(plan);
    }
  }

  getSavingsPercentage(): number {
    return 17; // 17% savings for yearly billing
  }

  private handleFreePlan(plan: PricingPlan): void {
    // For free plan, just redirect to tools or show success message
    console.log('Free plan selected:', plan);
    this.router.navigate(['/tools']);
  }

  private handleEnterprisePlan(plan: PricingPlan): void {
    // For enterprise plan, redirect to contact or show contact form
    console.log('Enterprise plan selected:', plan);
    // You can implement contact form or redirect to contact page
    window.open('mailto:sales@photoai.com?subject=Enterprise Plan Inquiry', '_blank');
  }

  private async handlePaidPlan(plan: PricingPlan): Promise<void> {
    this.isProcessingPayment = true;
    this.paymentError = null;
    this.paymentSuccess = null;

    try {
      // Create checkout session data
      const checkoutData = {
        name: plan.name,
        currency: 'usd',
        amount: plan.price * 100, // Convert to cents
        quantity: 1,
        subscriptionId: this.getSubscriptionId(plan.id),
        billingCycle: this.billingCycle,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        successUrl: `${window.location.origin}/billing?success=true&plan=${plan.id}`,
      };

      console.log('Creating checkout session:', checkoutData);

      // Create checkout session via backend
      this.paymentService.createCheckoutSession(checkoutData).subscribe({
        next: (response) => {
          console.log('Checkout session response:', response);
          
          // Check if response is successful using helper method
          if (this.handleApiResponse(response) && response.data && (response.data.sessionId || response.data.url)) {
            // Show success message before redirect
            this.paymentSuccess = 'Redirecting to payment page...';
            
            // Use the new redirect method
            this.redirectToPayment(response);
          } else {
            console.error('Invalid response or no session ID received:', response);
            this.isProcessingPayment = false;
            // Error message already set by handleApiResponse method
          }
        },
        error: (error) => {
          console.error('Error creating checkout session:', error);
          this.isProcessingPayment = false;
          this.paymentError = 'Failed to create checkout session. Please try again.';
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
      this.isProcessingPayment = false;
      this.paymentError = 'An unexpected error occurred. Please try again.';
    }
  }

  private getSubscriptionId(planId: string): number {
    // Map plan IDs to subscription IDs
    const subscriptionMap: { [key: string]: number } = {
      'pro': 1,
      'enterprise': 2
    };
    return subscriptionMap[planId] || 1;
  }

  private handleApiResponse(response: any): boolean {
    // Check if response is successful
    if (response && response.status === '000') {
      return true;
    }
    
    // Handle different error status codes
    switch (response?.status) {
      case '001':
        this.paymentError = 'Invalid request parameters. Please try again.';
        break;
      case '002':
        this.paymentError = 'User not authenticated. Please log in and try again.';
        break;
      case '003':
        this.paymentError = 'Subscription not found. Please contact support.';
        break;
      case '500':
        this.paymentError = 'Server error. Please try again later.';
        break;
      default:
        this.paymentError = response?.message || 'An unexpected error occurred. Please try again.';
    }
    
    return false;
  }

  private redirectToPayment(response: any): void {
    // Log URL for debugging purposes
    if (response.data.url) {
      console.log('Stripe Checkout URL:', response.data.url);
      console.log('URL length:', response.data.url.length);
      console.log('Is mobile device:', this.isMobileDevice());
    }

    // Method 1: Direct URL redirect (recommended - more reliable)
    if (response.data.url) {
      console.log('Using direct URL redirect');
      // Add small delay to show success message
      setTimeout(() => {
        window.location.href = response.data.url;
      }, 1000);
      return;
    }

    // Method 2: Stripe.js redirect (fallback)
    if (response.data.sessionId) {
      console.log('Using Stripe.js redirect with sessionId:', response.data.sessionId);
      this.stripePromise.then(stripe => {
        if (stripe) {
          stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
          }).then(result => {
            if (result.error) {
              console.error('Stripe redirect error:', result.error);
              this.isProcessingPayment = false;
              this.paymentError = 'Failed to redirect to payment page. Please try again.';
            }
          });
        } else {
          console.error('Stripe not loaded');
          this.isProcessingPayment = false;
          this.paymentError = 'Payment system not available. Please try again later.';
        }
      });
    }
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Methods for section components
  setPricing(period: 'monthly' | 'yearly'): void {
    this.billingCycle = period;
    this.initializePlans();
  }

  toggleFaq(idx: number): void {
    // Handle FAQ toggle if needed
    console.log('FAQ toggled:', idx);
  }
}
