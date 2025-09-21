import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	messageSource = new BehaviorSubject<string>("default message");
	currentMessage = this.messageSource.asObservable();

	constructor() { }

	changeMessage(message: string) {
		console.log("DataService:")
		console.log(message)
		this.messageSource.next(message)
	}

}