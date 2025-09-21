import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config, api } from "../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable( { providedIn: 'root' } )
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
	
    response: any;
    constructor( 
            private http: HttpClient ) {
        //this.logout()
        this.currentUserSubject = new BehaviorSubject<any>( JSON.parse( localStorage.getItem( 'currentUser' ) ) );
        this.currentUser = this.currentUserSubject.asObservable();
        
    }
    
    getCurrentUser(): any {
        //console.log("getCurrentUser:")
        //console.log(localStorage.getItem( 'currentUser' ))
        return new BehaviorSubject<any>( JSON.parse( localStorage.getItem( 'currentUser' ) ) ).value;
    }
    
    public get currentUserValue(): any {
       // console.log("currentUserSubject:")
        //console.log(this.currentUserSubject.value)
        return this.currentUserSubject.value;
    }
    
	loginSocial(userData: any){
		//FB userData = {"id":"10158889168232663","name":"Mai","email":"tuanma_it@yahoo.com","photoUrl":"https://graph.facebook.com/10158889168232663/picture?type=normal","firstName":"Mai","authToken":"GGQVlZAM3ZA5dXFMRFVmUzQ1VnNYc21OaFJFTmZAkSG43Rmx1eWFkYU9mUG9qdHI1SVRxNWhFbmU5bEZA5Rmg5NG5id3FtV2ZAkd2FHVGhPS2FEbi1hZAGtCOURYSjRVajlma1dBUXJlUktWbjhLejFHS1ZAVVHdWRlc0M3Y4cGo2VUtPaVdPdwZDZD","response":{"name":"Mai","email":"tuanma_it@yahoo.com","picture":{"data":{"height":600,"is_silhouette":false,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158889168232663&gaming_photo_type=unified_picture&ext=1636650605&hash=AeRK0h7UU2ps76XF7Yo","width":600}},"first_name":"Mai","id":"10158889168232663"},"provider":"FACEBOOK"}
		return this.http.post(`${api.fansApi}/social`, userData).pipe(map(data => {
        	//console.log("loginSocial:");
			this.response = data
			if (this.response.status == '000') {
				//console.log( this.response.data);
        		//console.log( this.response.data.access_token);
             	this.storeSession(this.response.data);
			}
             return this.response;
        }));
    }
    
    login( userData: any ) {
        this.logout();
        let headers = new HttpHeaders( {
            'Authorization': 'Basic ' + btoa( `${config.jwtClientId}` + ':' + `${config.jwtClientSecret}` ),
            'Content-Type': 'application/json'
        } );

        return this.http.post<any>( `${api.fansApi}/oauth/token`, userData, { headers } )
            .pipe( map( data => {
				//console.log('token:')
				//console.log(data)
				if(data.status == '000'){
                	this.storeSession(data.data);
				}
				return data;
            } ) );
    }
    
    // Gộp lại thành 1
    storeSession(data: any) {
		const helper = new JwtHelperService();
    	var tokenData = helper.decodeToken( JSON.stringify( data.access_token ) );
    	if ( data && data.access_token ) {
	        //console.log( "tokenData " +  tokenData );
	       // console.log( "tokenData.user " +  tokenData.user );
	        localStorage.setItem( 'access_token', data.access_token )
	        localStorage.setItem( 'refresh_token', data.refresh_token )
	        localStorage.setItem('currentUser', JSON.stringify(tokenData.user));
	        localStorage.setItem( 'authorities', tokenData.authorities )
	        localStorage.setItem( 'user_name', tokenData.user_name )
	        localStorage.setItem( 'expires_in', data.expires_in )
	        this.currentUserSubject.next(data);
        }
    }
    forgotPassword(email: any) {
	
    }
    logout() {
        // remove user from local storage to log user out
        //console.log( "logout: remove user from local storage" );
        localStorage.removeItem( 'currentUser' );
        localStorage.removeItem( 'access_token' );
        localStorage.removeItem( 'refresh_token' );
        localStorage.removeItem( 'user_name' );
        localStorage.removeItem( 'authorities' );
        localStorage.removeItem( 'expires_in' );
        localStorage.clear()
        this.currentUserSubject.next( null );
        this.currentUser = null;
    }

    login_v2(username: string,password: string){
        localStorage.clear()
        let params = {
            userName: username,
            password: password
        }

        let headers = new HttpHeaders( {
            'Content-Type': 'application/json'
        } );

        return this.http.post<any>( `${config.apiGateway}/auth/login`, params, { headers } )
            .pipe( map( data => {
                //console.log( JSON.stringify( data ) );
				if (data.status == '000') {
               		this.storeSession(data.data);
				}
                return data;
            } ) );
        
    }
}