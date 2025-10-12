import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

export interface PaymentHistory {
  id: number;
  userId: number;
  subscriptionId: number;
  paymentMethod: string;
  paymentReference: string;
  amount: number;
  currency: string;
  status: string;
  transactionId?: string;
  description?: string;
  metadata?: string;
  paymentDate: string;
  createDate: string;
  updateDate: string;
  subscriptionName?: string;
  statusDisplay?: string;
  amountDisplay?: string;
}

export interface PaymentStats {
  userId: number;
  totalAmount: number;
  paymentCount: number;
}

export interface PaymentHistoryResponse {
  status: string;
  message: string;
  data: PaymentHistory[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  constructor(private http: HttpClient) { }

  /**
   * Get user's payment history with pagination
   */
  getPaymentHistory(page: number = 1, size: number = 10): Observable<PaymentHistoryResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PaymentHistoryResponse>(`${api.baseUrlApi}/payment-history?page=${page}&size=${size}`, { headers });
  }

  /**
   * Get user's payment statistics
   */
  getPaymentStats(): Observable<PaymentStats> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PaymentStats>(`${api.baseUrlApi}/payment-history/stats`, { headers });
  }
}
