import { Component, OnInit, OnDestroy, Inject, AfterViewInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { Location , DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import Swiper from 'swiper';
import * as AOS from "aos"
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-header',
	styleUrls: ['./header.component.scss'],
	templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

	@Input() menuShow: boolean;
	
	constructor(
		private router: Router,
		@Inject(DOCUMENT) private document: Document,
		private readonly location: Location) {
			console.log(this.location.path());
	}

	ngOnInit() {
		console.log(this.menuShow)
	}

	downloadApp() {
		window.open('https://apps.apple.com/us/app/qr-code-reader-barcode-qr/id6747792526', '_blank');
	}

	takePhotos() {
		this.router.navigate(['/tools']);
	}

	ngOnDestroy() {
	}

	ngAfterViewInit() {

	}
}
