import { Component, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { Meta, Title } from '@angular/platform-browser';
import { CommonService } from './_services';
@Component({
	// tslint:disable-next-line
	selector: 'body',
	templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{
	obj : any
	constructor(@Inject(DOCUMENT) private document: Document,
		private commonService: CommonService,
		private title: Title,
		private meta: Meta) {
			this.setMetaTile();
	}

	
	ngOnInit() {

	}
	setMetaTile() {
        this.commonService.getMetas().subscribe(res => {
			this.obj = res;
			let getMeta = this.obj["default"]
            if(getMeta){
				this.title.setTitle(getMeta.title);
				this.meta.updateTag(
					{
					name: 'description',
					content: getMeta.description
				});
				this.meta.updateTag(
					{
					name: 'keywords',
					content: getMeta.keyworks
				});
				this.meta.updateTag(
					{
					name: 'author',
					content: getMeta.author
				});
			}
		}, err => {
			console.log(err.error)
		});
    }

	ngOnDestroy() {
	}
	
	ngAfterViewInit() {
	}

}
