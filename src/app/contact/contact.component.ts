import { Component, OnDestroy, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swiper from 'swiper';
import * as AOS from "aos"
import { Subject } from 'rxjs';
import { CompanyService, CommonService, TransactionService } from '../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagerService } from '../_helpers';

@Component({
	selector: 'app-contact',
	styleUrls: ['./contact.component.scss'],
	templateUrl: './contact.component.html',
	styles: ['@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";']
})
export class ContactComponent implements OnDestroy {

	response: any;
	blogForm: any;
	currentCompany: any
	pagedItems: any[];
	pager: any = {};
	totalRows = 0;
	pageSize = 5;
	companyId: number
	loading: boolean
	listCompany: any;
	listTransaction: any;
	targetElement: Element;
	currentSize = 10
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private pagerService: PagerService,
		private commonService: CommonService,
		private transactionService: TransactionService,
		private companyService: CompanyService,
	) {
		this.route.paramMap.subscribe(params => {
			this.companyId = parseInt(params.get("id"))
			console.log("companyId: " + this.companyId);
			if (this.companyId){
				this.getCompanyDetail(this.companyId);
			}else{
				this.getListCompany(this.blogForm.value);
			}
		})
	}
	
    alert(message: string) {
        alert(message);
    }
	
	private getListCompany(companyForm: any) {
		this.companyService.list(companyForm).subscribe(res => {
			this.response = res;
			if (this.response.status == '000') {
				this.listCompany = this.response.data.list;
			}else if (this.response.status == '001') {
			}else{
				
			}
		}, err => {
		});

	}
	
	getAmount1(amount:number){
		const words = amount.toString().split('.');
		return words[0] ? words[0]  : "00"
	}
	getAmount2(amount:number){
		const words = amount.toString().split('.');
		return words[1] ? words[1] : "00";
	}
	
	
	onScrollingFinished() {
		console.log('load more');
		this.currentSize = this.currentSize + 10
		this.getListTransaction(this.currentCompany.id, this.currentSize)
	}
	
	
	private getCompanyDetail(id: number) {
		this.loading = true;
		this.companyService.getById(id).subscribe(res => {
			this.response = res;
			console.log(this.response)
			if (this.response.status == '000') {
				this.currentCompany = this.response.data;
				this.getListTransaction(this.currentCompany.id, this.currentSize)
				
				console.log("currentCompany:")
				console.log(this.currentCompany)
			} else {
				console.log("error:")
				console.log(this.response.status)
				console.log(this.response.message)
			}
			this.loading = false;
		}, err => {
			console.log(`err`);
			console.log(err);
			this.loading = false;
		});
	}
	private getListTransaction(id: number, currentSize: number) {
		this.loading = true;
		let param = {
			companyId: id,
			page: 1,
			size: currentSize
		}
		this.transactionService.list(param).subscribe(res => {
		this.response = res;
		console.log(this.response)
		if (this.response.status == '000') {
			let listTransactionTmp = this.response.data.list;
			listTransactionTmp.sort((a,b) => new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime());
			let listDateKey = [];
			listTransactionTmp?.forEach(function(t) {
				let dateObject = new Date()
				if(t.updateDate){
					dateObject = new Date(t.updateDate);
				}
				const formattedDate = dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
				let listData = [];
				if(listDateKey[formattedDate]){
					listData = listDateKey[formattedDate]
				}
				listData.push(t)
				listDateKey[formattedDate] = listData;
			}, this);
			
			this.listTransaction = listDateKey
		} else {
			console.log("error:")
			console.log(this.response.status)
			console.log(this.response.message)
		}
		this.loading = false;
	}, err => {
		console.log(`err`);
		console.log(err);
		this.loading = false;
	});
	}
	ngOnInit() {
	}
	
	
	ngAfterContentInit() {

	}

	ngAfterViewInit() {
	}


	ngOnDestroy() {
	}

}
