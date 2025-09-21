import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component(
	{
		selector: 'app-footer',
		templateUrl: 'footer.component.html',
		styleUrls: ['./footer.component.scss']
	})
export class FooterComponent {
	domain: any;
	productForm: any;
	response: any;
	listProduct: any;
	
	constructor(
		@Inject(DOCUMENT) private document: any,
		private router: Router
	) {
	}

	ngOnInit() {
		this.domain = this.document.location.hostname;
        console.log(this.domain);
	}

	navigateToHelp() {
		window.open('https://scanqrread.com/help', '_blank');
	}

	navigateToContact() {
		window.open('https://scanqrread.com/contact', '_blank');
	}

	navigateToPrivacy() {
		window.open('https://scanqrread.com/privacy', '_blank');
	}

	navigateToTerms() {
		window.open('https://scanqrread.com/terms', '_blank');
	}
	

}