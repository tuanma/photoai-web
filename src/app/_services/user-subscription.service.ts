import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, api } from '../../environments/environment';

export interface UserSubscription {
  id: number;
  userId: number;
  subscriptionId: number;
  status: string;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  paymentMethod: string;
  paymentReference: string;
  createDate: string;
  updateDate: string;
  subscriptionName?: string;
  subscriptionDescription?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSubscriptionService {

  constructor(private http: HttpClient) { }

  /**
   * Get current active subscription
   */
  getCurrentSubscription(): Observable<UserSubscription> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<UserSubscription>(`${api.baseUrlApi}/user-subscriptions/current`, { headers });
  }

  /**
   * Get subscription history
   */
  getSubscriptionHistory(page: number = 1, size: number = 10): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get(`${api.baseUrlApi}/user-subscriptions/history?page=${page}&size=${size}`, { headers });
  }

  /**
   * Get user credits
   */
  getUserCredits(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get(`${api.baseUrlApi}/user-subscriptions/credits`, { headers });
  }

  /**
   * Cancel subscription
   */
  cancelSubscription(subscriptionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${api.baseUrlApi}/user-subscriptions/${subscriptionId}/cancel`, {}, { headers });
  }
}
