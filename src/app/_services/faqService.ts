import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class FaqService {
	private subPath = `${api.baseUrlApi}/faq`;
    constructor(private http: HttpClient) { }
	
    getById(id: string) {
        return this.http.get(`${this.subPath}/${id}`);
    }

    list( faq: any ) {
        return this.http.post( `${this.subPath}/list`, faq );
    }
    getAll(params: any) {
		var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}?` + queryString);
	}
    create( faq: any ) {
        return this.http.post( `${this.subPath}`, faq );
    }
    update( faq: any ) {
        return this.http.put( `${this.subPath}`, faq );
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