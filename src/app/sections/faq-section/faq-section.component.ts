import { Component, EventEmitter, Output } from '@angular/core';

export interface FaqItem {
	question: string;
	answer: string;
}

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent {
  @Output() toggleFaq = new EventEmitter<number>();
  
  openedFaqIndex: number | null = 0; // First FAQ open by default

  faqs: FaqItem[] = [
		{
			question: 'Generate AI photos and videos of yourself',
			answer: 'Creating realistic AI-generated photos of yourself used to require serious technical chops: GPUs, Python scripts, and days of setup. Now, thanks to platforms like Photo AI, it\'s as simple as uploading some selfies and in less than a minute later you have your own highly photorealistic AI photos indistinguishable from real life. Behind the scenes, it\'s powered by advanced machine learning, specifically a technique called DreamBooth, running on an AI model called Flux. Here\'s how it works and how you can do it both easily through Photo AI or manually on your own machine.'
		},
		{
			question: 'Create an AI model of yourself',
			answer: 'Photo AI makes it incredibly easy to create your own AI model. Simply upload 8-12 high-quality selfies of yourself, and our advanced AI will train a personalized model in just minutes. Once trained, you can generate unlimited photos and videos of yourself in any style, pose, or setting you can imagine.'
		},
		{
			question: 'Generate photos & videos in any pose or place',
			answer: 'With your trained AI model, you can generate photos and videos of yourself in any pose, location, or scenario. Whether you want professional headshots, vacation photos, or creative artistic images, our AI can create them all with just a simple text prompt.'
		},
		{
			question: 'Run 100s of photo packs',
			answer: 'Photo AI offers over 145+ professionally designed photo packs that automatically generate themed photos of you. From professional headshots to vacation photos, dating profiles to corporate portraits, simply select a pack and let our AI do the work. All packs are included in your membership!'
		},
		{
			question: 'Upscale your AI photos and videos with one click in Photo AI',
			answer: 'Enhance the resolution and quality of your AI-generated content with Photo AI\'s one-click upscaling feature. Our advanced algorithms intelligently increase image resolution while preserving details and reducing artifacts, giving you crisp, high-quality results perfect for any use case.'
		},
		{
			question: 'Create AI videos of yourself',
			answer: 'Generate professional videos of yourself speaking, dancing, or performing any action with our advanced AI video technology. Simply provide a script or choose from our library of actions, and our AI will create realistic videos of you performing them.'
		}
	];

  onToggleFaq(idx: number) {
    this.openedFaqIndex = this.openedFaqIndex === idx ? null : idx;
    this.toggleFaq.emit(idx);
  }
}
