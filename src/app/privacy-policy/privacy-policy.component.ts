import { Component, OnDestroy, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swiper from 'swiper';
import * as AOS from "aos"
import { Subject } from 'rxjs';
import { CompanyService, CommonService, TransactionService } from '../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagerService } from '../_helpers';
import { HttpClient } from '@angular/common/http';
declare let paypal: any;

@Component({
	selector: 'app-privacy-policy',
	styleUrls: ['./privacy-policy.component.scss'],
	templateUrl: './privacy-policy.component.html',
	styles: ['@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";']
})
export class PrivacyPolicyComponent implements OnDestroy {

	@Input() itemId: any;
	message: string | null = null;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private pagerService: PagerService,
		private commonService: CommonService,
		private transactionService: TransactionService,
		private companyService: CompanyService,
		private http: HttpClient
	) {

	}

	ngOnInit() {
		console.log(this.itemId.id);
	}

	initPayPalButton(itemId: any) {
		paypal.Buttons({
			createOrder: (data: any, actions: any) => {
				return actions.order.create({
					purchase_units: [
						{
							amount: {
								value: itemId.price, // Số tiền thanh toán
								currency_code: 'USD',
							}
						},
					],
				});
			},
			onApprove: async (data: any, actions: any) => {
				const order = await actions.order.capture();
				try {
					const response = await this.http
						.post('http://localhost:8080/api/paypal/capture', {
							orderID: data.orderID,
						})
						.toPromise();
					this.message = `Thanh toán PayPal thành công! Transaction ID: ${order.id}`;
				} catch (error: any) {
					this.message = `Lỗi: ${error.message}`;
				}
			},
			onError: (err: any) => {
				this.message = `Lỗi PayPal: ${err}`;
			},
		}).render('#paypal-button-container_'+itemId.id);
	}


	ngAfterContentInit() {
		
	}

	ngAfterViewInit() {
		this.initPayPalButton(this.itemId);
	}


	ngOnDestroy() {
	}

}
