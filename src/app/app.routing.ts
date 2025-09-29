import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './default-layout';
import { AuthGuard } from './_guards';
import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: {
			breadcrumb: 'blog'
		}
	},
	{
		path: 'login',
		component: LoginComponent,
		data: {
			breadcrumb: 'Login Page'
		}
	},
	{
		path: 'home',
		component: HomeComponent,
		data: {
			breadcrumb: 'blog'
		}
	},
	{
		path: 'about',
		component: AboutComponent,
		data: {
			breadcrumb: 'blog'
		}
	},
	{
		path: 'about/:id',
		component: AboutComponent,
		data: {
			breadcrumb: 'blog'
		}
	},
	{
		path: 'contact',
		component: ContactComponent,
		data: {
			breadcrumb: 'blog'
		}
	},
	{
		path: 'privacy',
		component: PrivacyPolicyComponent
	},
	{
		path: 'terms',
		component: TermsOfServiceComponent
	},
	{
		path: 'qr-code-generator',
		component: QrCodeGeneratorComponent,
		data: {
			breadcrumb: 'QR Code Generator'
		}
	},
	{
		path: 'tools',
		loadChildren: () => import('./tools/tools.routes').then(m => m.routes)
	},
	{
		path: 'editor',
		loadComponent: () => import('./editor/editor.component').then(m => m.EditorComponent)
	},
	{
		path: 'gallery',
		loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent)
	},
	{
		path: 'pricing',
		loadComponent: () => import('./pricing/pricing.component').then(m => m.PricingComponent)
	},
	{
		path: 'faq',
		loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent)
	},
	{
		path: 'billing',
		loadComponent: () => import('./billing/billing.component').then(m => m.BillingComponent)
	},
	{
		path: 'ideas',
		loadComponent: () => import('./ideas/ideas.component').then(m => m.IdeasComponent)
	},
	// HTML routes
	{
		path: 'home.html',
		component: HomeComponent,
		data: {
			breadcrumb: 'Home'
		}
	},
	{
		path: 'about.html',
		component: AboutComponent,
		data: {
			breadcrumb: 'About'
		}
	},
	{
		path: 'contact.html',
		component: ContactComponent,
		data: {
			breadcrumb: 'Contact'
		}
	},
	{
		path: 'privacy.html',
		component: PrivacyPolicyComponent
	},
	{
		path: 'terms.html',
		component: TermsOfServiceComponent
	},
	{
		path: 'qr-code-generator.html',
		component: QrCodeGeneratorComponent,
		data: {
			breadcrumb: 'QR Code Generator'
		}
	},
	{ path: '**', component: P404Component }
];
@NgModule({
	imports: [RouterModule.forRoot(routes,{useHash:false})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
