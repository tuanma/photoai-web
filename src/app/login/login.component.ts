import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, CommonService } from '../_services';
import { SocialAuthService } from "@abuelwiss/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abuelwiss/angularx-social-login";
import { SocialUser } from "@abuelwiss/angularx-social-login";
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
	user: SocialUser;
	loggedIn: boolean;

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
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	signOut(): void {
		this.authService.signOut();
	}

	refreshToken(): void {
		this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
	}
	getAccessToken(): void {
		this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
	}

	getUserInfo() {
		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
		});
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

	// Social Login Methods
	onGoogleLogin(): void {
		this.loading = true;
		console.log('Starting Google login...');
		
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
			.then((socialUser: SocialUser) => {
				console.log('Google login successful:', socialUser);
				this.handleSocialLogin(socialUser);
			})
			.catch((error) => {
				console.error('Google login failed:', error);
				this.alertService.error('Google đăng nhập thất bại: ' + error.message);
				this.loading = false;
			});
	}

	onFacebookLogin() {
		this.loading = true;
		console.log('Starting Facebook login...');
		
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
			.then((socialUser: SocialUser) => {
				console.log('Facebook login successful:', socialUser);
				this.handleSocialLogin(socialUser);
			})
			.catch((error) => {
				console.error('Facebook login failed:', error);
				this.alertService.error('Facebook đăng nhập thất bại: ' + error.message);
				this.loading = false;
			});
	}

	onAppleLogin() {
		this.alertService.error('Apple Sign-In sẽ được implement sau');
		this.loading = false;
	}


	private handleSocialLogin(socialUser: SocialUser) {
		alert("handleSocialLogin" + socialUser);
		console.log('Handling social login callback:', socialUser);
		
		// Prepare comprehensive data for API callback
		const socialLoginData = {
			provider: socialUser.provider,
			providerId: socialUser.id,
			email: socialUser.email,
			name: socialUser.name,
			firstName: socialUser.firstName || '',
			lastName: socialUser.lastName || '',
			photoUrl: socialUser.photoUrl,
			accessToken: socialUser.authToken,
			idToken: socialUser.idToken,
			authorizationCode: socialUser.authorizationCode || '',
			response: socialUser.response || {}
		};

		console.log('Sending social login data to API:', socialLoginData);

		// Call your authentication service with social login data
		this.authenticationService.loginSocial(socialLoginData)
			.pipe(first())
			.subscribe(
				resp => {
					console.log("Social login API response:", resp);
					if (resp.status == '000') {
						let d = resp.data;
						let u = d.user;
						console.log('User data from API:', u);
						
						// Store user data and token
						if (d.token) {
							localStorage.setItem('access_token', d.token);
						}
						if (u) {
							localStorage.setItem('currentUser', JSON.stringify(u));
						}
						
						// Check user role and navigate
						if (u.type == 'ADMIN') {
							this.router.navigate(['/home']);
							this.alertService.success('Đăng nhập Google thành công!');
						} else {
							this.alertService.error("User không được quyền truy cập");
							this.loading = false;
						}
					} else {
						this.alertService.error('[' + resp.status + '] ' + resp.message);
						this.loading = false;
					}
				},
				error => {
					console.error("Error on social login API call:", error);
					this.alertService.error('Lỗi đăng nhập xã hội: ' + (error.error?.message || error.message));
					this.loading = false;
				}
			);
	}

}
