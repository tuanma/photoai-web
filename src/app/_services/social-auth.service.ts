import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from '@abuelwiss/angularx-social-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthServiceWrapper {
  
  constructor(private socialAuthService: SocialAuthService) {}

  // Google Login
  signInWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // Facebook Login
  signInWithFacebook(): Promise<SocialUser> {
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  // Get current user
  getCurrentUser(): Observable<SocialUser> {
    return this.socialAuthService.authState;
  }

  // Sign out
  signOut(): Promise<void> {
    return this.socialAuthService.signOut();
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return new Observable(observer => {
      this.socialAuthService.authState.subscribe(user => {
        observer.next(!!user);
      });
    });
  }
}

