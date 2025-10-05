import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config, api } from "../../environments/environment";
@Injectable({ providedIn: 'root' })
export class CommonService {
	response: any;

	constructor(private http: HttpClient) {
	}
	getMetas() {
		return this.http.get('../../assets/meta/data.json');
	}

	getResource(p: string) {
		return this.http.get(`${api.baseUrlApi}/resource/list?type=` + p);
	}
	
}
