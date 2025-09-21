import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CompanyService {
	private subPath = `${api.fansApi}/company`;
    constructor(private http: HttpClient) { }
	
    getById(id: number) {
        return this.http.get(`${this.subPath}/${id}`);
    }
    
    list( company: any ) {
		var queryString = Object.keys(company).map(key => key + '=' + company[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}/list?` + queryString);
    }
	
    create( company: any ) {
        return this.http.post( `${this.subPath}`, company );
    }
    update( company: any ) {
        return this.http.put( `${this.subPath}`, company );
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