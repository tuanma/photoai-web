import { Component, OnInit, OnDestroy, Inject, AfterViewInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { Location , DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import Swiper from 'swiper';
import * as AOS from "aos"
import {filter} from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Component({
	selector: 'app-header',
	styleUrls: ['./header.component.scss'],
	templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

	@Input() menuShow: boolean;
	isLoggedIn: boolean = false;
	currentUser: any = null;
	
	constructor(
		private router: Router,
		@Inject(DOCUMENT) private document: Document,
		private readonly location: Location,
		private authenticationService: AuthenticationService) {
			console.log(this.location.path());
	}

	ngOnInit() {
		console.log(this.menuShow)
		this.checkLoginStatus();
		
		// Subscribe to authentication state changes
		this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
			this.isLoggedIn = !!user;
		});
	}

	downloadApp() {
		window.open('https://apps.apple.com/us/app/qr-code-reader-barcode-qr/id6747792526', '_blank');
	}

	takePhotos() {
		this.router.navigate(['/tools']);
	}

	checkLoginStatus() {
		this.currentUser = this.authenticationService.getCurrentUser();
		this.isLoggedIn = !!this.currentUser;
	}

	logout() {
		this.authenticationService.logout();
		this.isLoggedIn = false;
		this.currentUser = null;
		this.router.navigate(['/home']);
	}

	ngOnDestroy() {
	}

	ngAfterViewInit() {

	}
}
