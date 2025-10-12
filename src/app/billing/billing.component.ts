import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentHistoryService, PaymentHistory, PaymentStats, UserSubscriptionService } from '../_services';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class BillingComponent implements OnInit {
  
  paymentHistory: PaymentHistory[] = [];
  paymentStats: PaymentStats | null = null;
  currentSubscription: any = null;
  isLoading = true;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  
  // Success message from payment
  successMessage: string | null = null;
  successPlan: string | null = null;

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    private userSubscriptionService: UserSubscriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkPaymentSuccess();
    this.loadPaymentHistory();
    this.loadPaymentStats();
    this.loadCurrentSubscription();
  }

  private checkPaymentSuccess(): void {
    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        this.successMessage = 'Payment completed successfully!';
        this.successPlan = params['plan'];
        
        // Clear URL parameters
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {}
        });
      }
    });
  }

  private loadPaymentHistory(): void {
    this.isLoading = true;
    this.paymentHistoryService.getPaymentHistory(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.status === '000') {
          this.paymentHistory = response.data || [];
          this.totalPages = response.totalPages || 0;
          this.totalElements = response.totalElements || 0;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading payment history:', error);
        this.isLoading = false;
      }
    });
  }

  private loadPaymentStats(): void {
    this.paymentHistoryService.getPaymentStats().subscribe({
      next: (stats) => {
        this.paymentStats = stats;
      },
      error: (error) => {
        console.error('Error loading payment stats:', error);
      }
    });
  }

  private loadCurrentSubscription(): void {
    this.userSubscriptionService.getCurrentSubscription().subscribe({
      next: (subscription) => {
        this.currentSubscription = subscription;
      },
      error: (error) => {
        console.error('Error loading current subscription:', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPaymentHistory();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'status-completed';
      case 'PENDING':
        return 'status-pending';
      case 'FAILED':
        return 'status-failed';
      case 'REFUNDED':
        return 'status-refunded';
      default:
        return 'status-unknown';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  dismissSuccessMessage(): void {
    this.successMessage = null;
    this.successPlan = null;
  }
}
