import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, CommonService } from '../_services';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
	selector: 'app-dashboard',
	styleUrls: ['login.component.scss'],
	templateUrl: 'login.component.html',
	styles: ['@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";']
})
export class LoginComponent implements OnInit {
	selectedLang: string;
	loginForm: FormGroup;
	returnUrl: string;
	response: any;
	loading: boolean;
	showPasswordField: boolean = false;
	private accessToken = '';
	user: SocialUser | null = null;
	loggedIn: boolean = false;
	//https://github.com/akorez/angular-google-login
	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private commonService: CommonService,
		private authService: SocialAuthService
	) {
		// redirect to home if already logged in
		if (this.authenticationService.currentUserValue) {
			this.authenticationService.logout();
		}
		this.loading = false;
	}

	ngOnInit() {
		this.loginForm = this.fb.group({
			userName: ['', Validators.required],
			password: ['', Validators.required],
		});
		console.log(localStorage.getItem('access_token'));
		console.log('remove role');
		localStorage.removeItem('EASYPAYMENT_ROLE')
		// get return url from route parameters or default to '/'z
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	signOut(): void {
		this.authService.signOut();
	}


	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}

	signInWithFB(): void {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	onSubmit() {
		this.loading = true;
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			console.log("loginForm.invalid");
			return;
		}
		this.authenticationService.login(this.loginForm.value)
			.pipe(first())
			.subscribe(
				resp => {
					console.log("resp");
					console.log(resp);
					if (resp.status == '000') {
						let isAdmin = false;
						let d = resp.data
						let u = d.user;
						console.log(u);
						if (u.type == 'ADMIN') {
							this.router.navigate(['/home']);
						} else {
							//console.log("User not has role")
							this.alertService.error("User không được quyền truy cập")
						}
					} else {
						this.alertService.error('[' + resp.status + '] ' + resp.message);
						this.loading = false;
					}

				},
				error => {
					//console.log("Error on authen: ")
					//console.log(error)
					this.alertService.error('Lỗi đăng nhập');
					this.loading = false;
					return
				});
	}
}
