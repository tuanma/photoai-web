import { Component, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as $ from 'jquery';
import * as AOS from "aos"

@Component({
	selector: 'app-dashboard',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss']
})

export class DefaultLayoutComponent implements OnDestroy {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private el: ElementRef
	) {
	}
	ngOnInit() {
		
	}
	
	ngAfterViewInit() {
		
	}

	ngOnDestroy() {

	}
}
