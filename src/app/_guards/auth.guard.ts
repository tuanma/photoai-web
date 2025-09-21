import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from "../_services";

@Injectable( { providedIn: 'root' } )
export class AuthGuard implements CanActivate, CanLoad {

    isUserLoggedIn = true;
    constructor(
        private location: Location,
        private router: Router,
    ) { }

    canLoad( route: Route ): boolean {
        let access_token = localStorage.getItem( 'access_token' );
        let url: string = route.path;
        console.log( 'Url:' + url );
        console.log( 'access_token:' + access_token );
        if ( access_token ) {
            
            return true;
        }
        this.router.navigate( ['login'] );
        return false;
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        let access_token = localStorage.getItem( 'access_token' );
        let urlState: string = state.url;
        var levelPath = urlState.split( /[/]+/ ).pop();
        if ( access_token ) {
            let active = false;
            let userInfo = JSON.parse( localStorage.getItem( 'profile' ) );
            let activeApp = localStorage.getItem( 'ACTIVE_APP' );
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate( ['login'] );
        return false;
    }
}