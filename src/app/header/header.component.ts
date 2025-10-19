import { Component, OnInit, OnDestroy, Inject, AfterViewInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { Location , DOCUMENT, CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import * as $ from 'jquery';
import Swiper from 'swiper';
import * as AOS from "aos"
import {filter} from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { ClickOutsideDirective } from '../_directives/click-outside.directive';

@Component({
	selector: 'app-header',
	styleUrls: ['./header.component.scss'],
	templateUrl: 'header.component.html',
	standalone: true,
	imports: [CommonModule, RouterModule, ClickOutsideDirective]
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

	@Input() menuShow: boolean;
	isLoggedIn: boolean = false;
	currentUser: any = null;
	
	// Dashboard header properties
	currentCredits = 22;
	bonusCredits = 2000;
	showCreditsDropdown = false;
	isLoading = false;
	
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

	// Dashboard header methods
	buyCredits() {
		this.isLoading = true;
		console.log('Buy more credits');
		setTimeout(() => {
			this.router.navigate(['/pricing']);
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	upgrade() {
		this.isLoading = true;
		console.log('Upgrade subscription');
		setTimeout(() => {
			this.router.navigate(['/pricing']);
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	toggleCreditsDropdown(event?: Event) {
		if (event) {
			event.stopPropagation();
		}
		this.showCreditsDropdown = !this.showCreditsDropdown;
	}


	closeCreditsDropdown() {
		this.showCreditsDropdown = false;
	}

	// Navigation methods for dropdown menu items
	referFriends() {
		this.isLoading = true;
		console.log('Refer friends');
		setTimeout(() => {
			// TODO: Implement refer friends functionality
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	createAiModel() {
		this.isLoading = true;
		console.log('Create new AI model');
		setTimeout(() => {
			this.router.navigate(['/dashboard']);
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	ideasAndBugs() {
		this.isLoading = true;
		console.log('Ideas + bugs');
		setTimeout(() => {
			// TODO: Navigate to feedback page or open modal
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	changelog() {
		this.isLoading = true;
		console.log('Changelog');
		setTimeout(() => {
			// TODO: Navigate to changelog page
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	merch() {
		this.isLoading = true;
		console.log('Merch');
		setTimeout(() => {
			// TODO: Navigate to merch page
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	helpAndFaq() {
		this.isLoading = true;
		console.log('Help & FAQ');
		setTimeout(() => {
			this.router.navigate(['/faq']);
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	tosAndPrivacy() {
		this.isLoading = true;
		console.log('TOS & Privacy');
		setTimeout(() => {
			// TODO: Navigate to TOS/Privacy page
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}

	billing() {
		this.isLoading = true;
		console.log('Billing');
		setTimeout(() => {
			this.router.navigate(['/billing']);
			this.isLoading = false;
			this.closeCreditsDropdown();
		}, 500);
	}


	ngOnDestroy() {
	}

	ngAfterViewInit() {

	}
}
