import { KeyValue } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-multiselect-list',
	templateUrl: './multiselect-list.component.html',
	styleUrls: ['../about/about.component.scss'],
	styles: ['@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";']
})
export class MultiselectListComponent {
	@Output() scrollingFinished = new EventEmitter<void>();
	@Input() listTransaction: Array<string> = [];

	constructor() {
	}

	ngOnInit() {
		console.log(this.listTransaction)
	}

	sortByDateTimeDESC = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
		const ak = new Date(a.key).getTime();
		const bk = new Date(b.key).getTime();
		return ak > bk ? -1 : (bk > ak ? 1 : 0);
	}
	
	sortByDateTimeASC = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
		const ak = new Date(a.key).getTime();
		const bk = new Date(b.key).getTime();
		return ak > bk ? 1 : (bk > ak ? -1 : 0);
	}

	onScrollingFinished() {
		this.scrollingFinished.emit();
	}

	getAmount1(amount: number) {
		const words = amount.toString().split('.');
		return words[0] ? words[0] : "00"
	}
	getAmount2(amount: number) {
		const words = amount.toString().split('.');
		return words[1] ? words[1] : "00";
	}
}