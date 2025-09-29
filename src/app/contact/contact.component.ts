import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-contact',
	styleUrls: ['./contact.component.scss'],
	templateUrl: './contact.component.html',
	standalone: true,
	imports: [CommonModule, FormsModule]
})
export class ContactComponent implements OnInit {

	contactForm = {
		name: '',
		email: '',
		subject: '',
		message: '',
		newsletter: false
	};

	constructor() { }

	ngOnInit(): void {
	}

	onSubmit(): void {
		console.log('Contact form submitted:', this.contactForm);
		// Handle form submission logic here
		alert('Thank you for your message! We\'ll get back to you within 24 hours.');
		this.resetForm();
	}

	private resetForm(): void {
		this.contactForm = {
			name: '',
			email: '',
			subject: '',
			message: '',
			newsletter: false
		};
	}
}
