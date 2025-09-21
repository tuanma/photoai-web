import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserQRCodeReader } from '@zxing/browser';

export interface FaqItem {
	question: string;
	answer: string;
}

@Component({
	selector: 'app-home',
	styleUrls: ['./home.component.scss'],
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	scannedData: string = '';
	@ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

	faqs: FaqItem[] = [
		{
			question: 'How to scan a QR code?',
			answer: 'You can scan a QR code online using the web app. Alternatively, you can use your phone camera. Most of the phones have built-in camera scanning capability. You need to open your phone camera and point it towards the code. Otherwise, download the QR scanning app.'
		},
		{ question: 'How to scan QR codes on iPhone?', answer: '' },
		{ question: 'How to scan a QR code on Android?', answer: '' },
		{ question: 'Can you scan a QR code without an app?', answer: '' },
		{ question: 'Is there an app to scan QR codes?', answer: '' },
		{ question: 'Can you scan a QR code from a picture?', answer: '' },
		{ question: 'How do I scan a QR code with my laptop?', answer: '' },
		{ question: 'How to scan a QR code from a screenshot?', answer: '' },
		{ question: 'How to Scan WiFi QR code on Laptop?', answer: '' },
	];

	openedFaqIndex: number | null = null;

	constructor(
		private router: Router
	) {}

	ngOnInit() {
		this.initializeAnimations();
	}

	private initializeAnimations() {
		console.log('Scan QR Reader Home Page Loaded');
	}

	downloadApp() {
		window.open('https://apps.apple.com/us/app/qr-code-reader-barcode-qr/id6747792526', '_blank');
	}

	tryOnline() {
		this.router.navigate(['/qr-code-generator']);
	}

	downloadFromAppStore() {
		window.open('https://apps.apple.com/us/app/qr-code-reader-barcode-qr/id6747792526', '_blank');
	}

	downloadFromGooglePlay() {
		this.router.navigate(['/home']);
	}

	// --- QR IMAGE UPLOAD UI ONLY ---
	async onFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = async (e: any) => {
				const imageUrl = e.target.result;
				const img = new Image();
				img.src = imageUrl;
				img.onload = async () => {
					try {
						const codeReader = new BrowserQRCodeReader();
						const result = await codeReader.decodeFromImageElement(img);
						this.scannedData = result.getText();
					} catch (err) {
						this.scannedData = 'Không nhận diện được QR code!';
					}
				};
			};
			reader.readAsDataURL(file);
		}
	}

	async onDrop(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer && event.dataTransfer.files.length > 0) {
			const file = event.dataTransfer.files[0];
			const reader = new FileReader();
			reader.onload = async (e: any) => {
				const imageUrl = e.target.result;
				const img = new Image();
				img.src = imageUrl;
				img.onload = async () => {
					try {
						const codeReader = new BrowserQRCodeReader();
						const result = await codeReader.decodeFromImageElement(img);
						this.scannedData = result.getText();
					} catch (err) {
						this.scannedData = 'Không nhận diện được QR code!';
					}
				};
			};
			reader.readAsDataURL(file);
		}
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
	}

	copyResults() {
		if (this.scannedData) {
			navigator.clipboard.writeText(this.scannedData);
		}
	}

	toggleFaq(idx: number) {
		this.openedFaqIndex = this.openedFaqIndex === idx ? null : idx;
	}
}
