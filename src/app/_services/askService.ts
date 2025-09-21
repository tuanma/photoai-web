import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AskService {
	private subPath = `${api.fansApi}/ask`;
    constructor(private http: HttpClient) { }

	list(params: any) {
        var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        return this.http.get(`${this.subPath}?${queryString}`);
    }

    listAll() {
        return this.http.get(`${this.subPath}`);
    }
    getAll(params: any) {
		var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}?` + queryString);
	}

    getById(id: string) {
        return this.http.get(`${this.subPath}/${id}`);
    }
    getListAskByProduct(productId: number) {
        return this.http.get(`${this.subPath}?productId=${productId}`);
    }

	search( ask: any ) {
        return this.http.post( `${this.subPath}/list`, ask );
    }
	
    create( ask: any ) {
        return this.http.post( `${this.subPath}`, ask );
    }
    update( ask: any ) {
        return this.http.put( `${this.subPath}`, ask );
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