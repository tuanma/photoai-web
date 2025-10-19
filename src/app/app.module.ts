import {
	APP_BASE_HREF,
	CurrencyPipe,
	DatePipe,
	DecimalPipe,
	HashLocationStrategy,
	LocationStrategy,
	PathLocationStrategy
} from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PipeModule } from './_helpers/pipes/pipe.module';
// Import layout
import { DefaultLayoutComponent } from './default-layout';
//used to create fake backend
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { NavMenuComponent } from './_components';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
// import { ContactComponent } from './contact'; // Now standalone
import { MultiselectListComponent } from './_components';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { SharedComponentModule } from './_shared/shared.module';
import { SectionsModule } from './sections/sections.module';

// Import 3rd party components
import { AutofocusDirective } from './_helpers/autofocus.directive';
import { ScrollTrackerDirective } from './_helpers/scroll-to-bottom.directive';

// Firebase main module
import { environment } from '../environments/environment';
import { LoginComponent } from './login';
import { QrCodeGeneratorModule } from './qr-code-generator/qr-code-generator.module';

// Social Login
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

const components = [
	DefaultLayoutComponent,
	// HeaderComponent, // Now standalone
	FooterComponent,
	HomeComponent,
	NavMenuComponent,
	AboutComponent,
	// ContactComponent, // Now standalone
	MultiselectListComponent,
	LoginComponent,
	PrivacyPolicyComponent,
	TermsOfServiceComponent
];

const entryComponents = [
	AutofocusDirective, ScrollTrackerDirective
];

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule, PipeModule,
		SharedComponentModule,
		ReactiveFormsModule,
		QrCodeGeneratorModule,
		SocialLoginModule,
		GoogleSigninButtonModule,
		SectionsModule,
		HeaderComponent, // Import standalone component
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [
		AppComponent,
		...components,
		...entryComponents,
	],
	providers: [
		{ provide: LocationStrategy, useClass: PathLocationStrategy },//HashLocationStrategy
		HttpClientModule,
		{ provide: APP_BASE_HREF, useValue: '/' },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		CurrencyPipe,
		DecimalPipe,
		DatePipe,
		[Meta],
		// provider used to create fake backend
		fakeBackendProvider, FormGroupDirective,
		// Social Login Configuration
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				lang: 'en',
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider('99119992057-m2d22glpdjimk6bf2qr7ffop48mqd4g8.apps.googleusercontent.com')
					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('YOUR_FACEBOOK_APP_ID')
					}
				],
				onError: (err) => {
					console.error('Social login error:', err);
				}
			} as SocialAuthServiceConfig,
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

