import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class HomePageService {
	private subPath = `${api.baseUrlApi}/home-page`;
    constructor(private http: HttpClient) { }
	
    getById(id: string) {
        return this.http.get(`${this.subPath}/${id}`);
    }

    list( homePage: any ) {
        return this.http.post( `${this.subPath}/list`, homePage );
    }
    getAll(params: any) {
		var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}?` + queryString);
	}
    create( homePage: any ) {
        return this.http.post( `${this.subPath}`, homePage );
    }
    update( homePage: any ) {
        return this.http.put( `${this.subPath}`, homePage );
    }

    delete( id: any ) {
        return this.http.delete( `${this.subPath}/${id}` );
    }

	createOrUpdate(dataForm: any, id: number){
		if(id > 0)
			return this.update(dataForm)
		else
			return this.create(dataForm)
	}
}