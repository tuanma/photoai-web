import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import all section components
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { IntegrationsSectionComponent } from './integrations-section/integrations-section.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { TrustedSectionComponent } from './trusted-section/trusted-section.component';
import { CompareSectionComponent } from './compare-section/compare-section.component';
import { AiModelsSectionComponent } from './ai-models-section/ai-models-section.component';
import { PhotoPacksSectionComponent } from './photo-packs-section/photo-packs-section.component';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';

@NgModule({
  declarations: [
    HeroSectionComponent,
    IntegrationsSectionComponent,
    GallerySectionComponent,
    TrustedSectionComponent,
    CompareSectionComponent,
    AiModelsSectionComponent,
    PhotoPacksSectionComponent,
    PricingSectionComponent,
    FaqSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeroSectionComponent,
    IntegrationsSectionComponent,
    GallerySectionComponent,
    TrustedSectionComponent,
    CompareSectionComponent,
    AiModelsSectionComponent,
    PhotoPacksSectionComponent,
    PricingSectionComponent,
    FaqSectionComponent
  ]
})
export class SectionsModule { }
