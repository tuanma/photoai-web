import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

	faqs: FaqItem[] = [
		{
			question: 'What is PhotoAI?',
			answer: 'PhotoAI is an advanced AI-powered photo editing platform that helps you create stunning images with professional quality. Our tools include background removal, photo upscaling, AI generation, and much more.'
		},
		{ 
			question: 'How does AI photo editing work?', 
			answer: 'Our AI algorithms analyze your images and apply advanced processing techniques to enhance quality, remove backgrounds, upscale resolution, and create new content based on your specifications.' 
		},
		{ 
			question: 'Is my data secure?', 
			answer: 'Yes, we prioritize your privacy. Your images are processed securely and never stored on our servers. We use industry-standard encryption and follow strict data protection protocols.' 
		},
		{ 
			question: 'What file formats are supported?', 
			answer: 'We support all major image formats including JPEG, PNG, WebP, and TIFF. You can upload images up to 50MB in size.' 
		},
		{ 
			question: 'How long does processing take?', 
			answer: 'Most edits are completed within 10-30 seconds, depending on the complexity and size of your image. Our AI is optimized for speed while maintaining quality.' 
		},
		{ 
			question: 'Can I use PhotoAI for commercial purposes?', 
			answer: 'Yes, with our Pro and Enterprise plans, you can use PhotoAI for commercial projects. Check our pricing page for details on commercial usage rights.' 
		},
		{ 
			question: 'Do you offer batch processing?', 
			answer: 'Yes, our Pro and Enterprise plans include batch processing capabilities, allowing you to edit multiple images simultaneously.' 
		},
		{ 
			question: 'What if I\'m not satisfied with the results?', 
			answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact our support team for a full refund.' 
		},
	];

	openedFaqIndex: number | null = null;

	constructor(
		private router: Router
	) {}

	ngOnInit() {
		this.initializeAnimations();
	}

	private initializeAnimations() {
		console.log('PhotoAI Home Page Loaded');
	}

	startEditing() {
		this.router.navigate(['/editor']);
	}

	learnMore() {
		this.router.navigate(['/about']);
	}

	navigateToTool(tool: string) {
		this.router.navigate(['/tools', tool]);
	}

	viewExamples() {
		this.router.navigate(['/gallery']);
	}

	toggleFaq(idx: number) {
		this.openedFaqIndex = this.openedFaqIndex === idx ? null : idx;
	}
}
