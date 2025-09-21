import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as QRCode from 'qrcode';
import type { QRCodeErrorCorrectionLevel } from 'qrcode';

export type QrType = 'link' | 'text' | 'email' | 'location' | 'phone' | 'sms' | 'whatsapp' | 'skype' | 'zoom' | 'wifi' | 'vcard' | 'event' | 'paypal' | 'bitcoin';

const QR_TYPES: { key: QrType, label: string, icon: string }[] = [
  { key: 'link', label: 'Link', icon: 'fa-solid fa-link' },
  { key: 'text', label: 'Text', icon: 'fa-solid fa-font' },
  { key: 'email', label: 'E-mail', icon: 'fa-solid fa-envelope' },
  { key: 'location', label: 'Location', icon: 'fa-solid fa-map-marker-alt' },
  { key: 'phone', label: 'Phone', icon: 'fa-solid fa-phone' },
  { key: 'sms', label: 'SMS', icon: 'fa-solid fa-sms' },
  { key: 'whatsapp', label: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
  { key: 'skype', label: 'Skype', icon: 'fa-brands fa-skype' },
  { key: 'zoom', label: 'Zoom', icon: 'fa-solid fa-video' },
  { key: 'wifi', label: 'WI-FI', icon: 'fa-solid fa-wifi' },
  { key: 'vcard', label: 'V-card', icon: 'fa-solid fa-id-card' },
  { key: 'event', label: 'Event', icon: 'fa-solid fa-calendar-alt' },
  { key: 'paypal', label: 'PayPal', icon: 'fa-brands fa-paypal' },
  { key: 'bitcoin', label: 'BitCoin', icon: 'fa-brands fa-btc' },
];

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.css']
})
export class QrCodeGeneratorComponent implements OnInit {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
  
  qrForm: FormGroup;
  emailForm: FormGroup;
  phoneForm: FormGroup;
  smsForm: FormGroup;
  qrCodeData: string = '';
  qrCodeSize: number = 200;
  qrCodeColor: string = '#000000';
  qrCodeBgColor: string = '#FFFFFF';
  qrCodeErrorCorrection: string = 'M';
  qrCodeMargin: number = 4;
  isGenerating: boolean = false;
  downloadUrl: string = '';
  qrTypes = QR_TYPES;
  selectedType: QrType = 'link';

  constructor(private fb: FormBuilder) {
    this.qrForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
      size: [200, [Validators.min(100), Validators.max(1000)]],
      color: ['#000000'],
      bgColor: ['#FFFFFF'],
      errorCorrection: ['M'],
      margin: [4, [Validators.min(0), Validators.max(10)]]
    });
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: [''],
      body: ['']
    });
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required]]
    });
    this.smsForm = this.fb.group({
      phone: ['', [Validators.required]],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.qrForm.valueChanges.subscribe(values => {
      this.qrCodeSize = values.size;
      this.qrCodeColor = values.color;
      this.qrCodeBgColor = values.bgColor;
      this.qrCodeErrorCorrection = values.errorCorrection;
      this.qrCodeMargin = values.margin;
    });
  }

  async generateQRCode(): Promise<void> {
    let data = '';
    if (this.selectedType === 'link' || this.selectedType === 'text') {
      if (this.qrForm.valid) {
        data = this.qrForm.get('text')?.value;
      }
    } else if (this.selectedType === 'email') {
      if (this.emailForm.valid) {
        const to = this.emailForm.get('to')?.value;
        const subject = encodeURIComponent(this.emailForm.get('subject')?.value || '');
        const body = encodeURIComponent(this.emailForm.get('body')?.value || '');
        data = `mailto:${to}?subject=${subject}&body=${body}`;
      }
    } else if (this.selectedType === 'phone') {
      if (this.phoneForm.valid) {
        const phone = this.phoneForm.get('phone')?.value;
        data = `tel:${phone}`;
      }
    } else if (this.selectedType === 'sms') {
      if (this.smsForm.valid) {
        const phone = this.smsForm.get('phone')?.value;
        const message = encodeURIComponent(this.smsForm.get('message')?.value || '');
        data = `sms:${phone}?body=${message}`;
      }
    }
    if (data) {
      this.isGenerating = true;
      this.qrCodeData = data;
      setTimeout(async () => {
        await this.drawQRCode();
        this.isGenerating = false;
      }, 200);
    }
  }

  private async drawQRCode(): Promise<void> {
    const canvas = this.qrCanvas.nativeElement;
    await QRCode.toCanvas(canvas, this.qrCodeData, {
      width: this.qrCodeSize,
      color: {
        dark: this.qrCodeColor,
        light: this.qrCodeBgColor
      },
      errorCorrectionLevel: this.qrCodeErrorCorrection as QRCodeErrorCorrectionLevel,
      margin: this.qrCodeMargin
    });
  }

  downloadQRCode(): void {
    const canvas = this.qrCanvas.nativeElement;
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  copyToClipboard(): void {
    const canvas = this.qrCanvas.nativeElement;
    canvas.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
          alert('QR code copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy to clipboard');
        });
      }
    });
  }

  clearQRCode(): void {
    this.qrForm.patchValue({ text: '' });
    this.qrCodeData = '';
    const canvas = this.qrCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  setType(type: QrType) {
    this.selectedType = type;
    // Reset form fields for each type
    this.qrForm.reset({
      text: '',
      size: 200,
      color: '#000000',
      bgColor: '#FFFFFF',
      errorCorrection: 'M',
      margin: 4
    });
    this.emailForm.reset();
    this.phoneForm.reset();
    this.smsForm.reset();
  }
} 