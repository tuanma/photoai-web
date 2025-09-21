import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    	 // add authorization header with jwt token if available
    	//sessionStorage.setItem('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZXYwMS52bkBnbWFpbC5jb20iLCJzY29wZSI6WyJ3ZWJjbGllbnQiLCJtb2JpbGVjbGllbnQiXSwiZXhwIjoxOTIxOTcyODUxLCJ1c2VyIjp7InVzZXJOYW1lIjoiZGV2MDEiLCJwaG90byI6ImF2YXRhci5wbmciLCJsZXZlbCI6eyJrZXkiOiJHVUVTVCIsInZhbHVlIjoiR1VFU1QifSwiZnVsbE5hbWUiOiJUcmFuIFRoYW5oIFBodSIsImZpcnN0TmFtZSI6IlRyYW4iLCJsYXN0TmFtZSI6IlRoYW5oIFBodSIsImNpdHkiOiJIw6AgTuG7mWkiLCJpZCI6MSwiZW1haWwiOiJkZXYwMS52bkBnbWFpbC5jb20iLCJwaG9uZSI6IjA5MDU1MDUwNDgiLCJiaXJ0aERhdGUiOiIyMi0wNS0xOTg1IiwicGhvbmVTdGF0dXMiOm51bGwsInNzbiI6IjAyNTI0MDMwNyIsInNzbkRhdGUiOiIxMC0wNC0yMDA5IiwiZ2VuZGVyIjoiTSIsImFkZHJlc3MiOiIxMSBNeSBEaW5oIiwiZGlzdHJpY3QiOiJDYXUgR2lheSIsIm1lcmNoYW50SWQiOm51bGwsImRldmljZUlkIjpudWxsLCJjb3VudHJ5IjoiVk4iLCJwb3N0Q29kZSI6bnVsbCwibm90aWZ5Ijp0cnVlLCJwcm92aWRlciI6bnVsbCwiZXh0ZXJuYWxJZCI6bnVsbCwidHlwZSI6IlBFUlNPTkFMIiwic3RhdHVzIjp7ImtleSI6IkFDVElWRSIsInZhbHVlIjoixJBBTkcgSE_huqBUIMSQ4buYTkcifSwiY3JlYXRlRGF0ZSI6MTYwNjYxMjI4NzI3NSwidXBkYXRlRGF0ZSI6MTYwNjYxMjI4NzI3NSwid2FsbGV0Ijp7ImlkIjoxLCJ1c2VySWQiOjEsImJhbGFuY2UiOjUwMDAwMCwid2FpdGluZyI6MTAwMDAsInBlbmRpbmciOjEwMDAwLCJmcmVlemluZyI6MTAwMDAsInR5cGUiOiJQRVJTT05BTCIsInN0YXR1cyI6IkFDVElWRSIsImNyZWF0ZURhdGUiOjE2MDY2MTI4MTg5ODUsInVwZGF0ZURhdGUiOjE2MDY2MTI4MTg5ODV9LCJyb2xlcyI6W3siaWQiOjUsIm5hbWUiOiJVU0VSIiwidHlwZSI6IlVTRVIifV19LCJhdXRob3JpdGllcyI6WyJVU0VSIl0sImp0aSI6IjFkZGM3MjZjLTQ2OGQtNDdjYi05MzZmLWI1OGQ4YmYzMWUxNyIsImNsaWVudF9pZCI6IjEyMyJ9.49ES3GlMYfKqTkMA3MftX3r3HX2OtKeUdLiyWy_TePE');
        let auth = `Basic MTIzOjEyMw==`;
		let accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            auth = `Bearer ${accessToken}`;
        }
		request = request.clone({
            setHeaders: { 
                Authorization: auth
            }
        });
        return next.handle(request);
    }
}