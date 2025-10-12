import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config, api } from '../../environments/environment'; 

export interface PaymentRequest {
  subscriptionId: number;
  paymentMethod: string;
  currency?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResponse {
  clientSecret?: string;
  paymentIntentId?: string;
  orderId?: string;
  status: string;
  message: string;
}

export interface PaymentConfig {
  stripePublicKey: string;
  supportedMethods: string[];
  defaultCurrency: string;
}

export interface CheckoutSessionRequest {
  name: string;
  currency: string;
  amount: number;
  quantity: number;
  subscriptionId: number;
  billingCycle: string;
  cancelUrl: string;
  successUrl: string;
}

export interface CheckoutSessionData {
  sessionId: string;
  message: string;
  url: string;
  status: string;
}

export interface CheckoutSessionResponse {
  status: string;
  message: string;
  data: CheckoutSessionData;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  constructor(private http: HttpClient) { }

  /**
   * Get payment configuration from backend
   */
  getPaymentConfig(): Observable<PaymentConfig> {
    return this.http.post<PaymentConfig>(`${api.baseUrlApi}/payments/config`, {});
  }

  /**
   * Create Stripe payment intent
   */
  createStripePaymentIntent(request: PaymentRequest): Observable<PaymentResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<PaymentResponse>(`${api.baseUrlApi}/payments/create-intent`, request, { headers });
  }

  /**
   * Confirm Stripe payment
   */
  confirmStripePayment(paymentIntentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${api.baseUrlApi}/payments/confirm`, 
      { paymentIntentId }, 
      { headers }
    );
  }

  /**
   * Create PayPal order
   */
  createPayPalOrder(request: PaymentRequest): Observable<PaymentResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<PaymentResponse>(`${api.baseUrlApi}/payments/paypal/create-order`, request, { headers });
  }

  /**
   * Capture PayPal payment
   */
  capturePayPalPayment(orderId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${api.baseUrlApi}/payments/paypal/capture`, 
      { orderId }, 
      { headers }
    );
  }

  /**
   * Create Stripe Checkout Session
   */
  createCheckoutSession(request: CheckoutSessionRequest): Observable<CheckoutSessionResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<CheckoutSessionResponse>(`${api.baseUrlApi}/payments/create-checkout-session`, request, { headers });
  }
}
