import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  @Output() navigateToTool = new EventEmitter<string>();
  @Output() startTakingPhotos = new EventEmitter<void>();
  @Output() signInWithGoogle = new EventEmitter<void>();

  onNavigateToTool(tool: string) {
    this.navigateToTool.emit(tool);
  }

  onStartTakingPhotos() {
    this.startTakingPhotos.emit();
  }

  onSignInWithGoogle() {
    this.signInWithGoogle.emit();
  }
}
