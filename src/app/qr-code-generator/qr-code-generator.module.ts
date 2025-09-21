import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QrCodeGeneratorComponent } from './qr-code-generator.component';

@NgModule({
  declarations: [QrCodeGeneratorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [QrCodeGeneratorComponent]
})
export class QrCodeGeneratorModule { } 