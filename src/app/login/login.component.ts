import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, CommonService } from '../_services';

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

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private commonService: CommonService,
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
		localStorage.removeItem( 'EASYPAYMENT_ROLE')
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
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
						if(u.type == 'ADMIN'){
							this.router.navigate(['/home']);
						}else {
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
