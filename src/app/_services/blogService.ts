import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BlogService {
	private subPath = `${api.baseUrlApi}/blog`;
    constructor(private http: HttpClient) { }
	
    getById(id: string) {
        return this.http.get(`${this.subPath}/${id}`);
    }

    list( blog: any ) {
        return this.http.post( `${this.subPath}/list`, blog );
    }
    getAll(params: any) {
		var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}?` + queryString);
	}
    create( blog: any ) {
        return this.http.post( `${this.subPath}`, blog );
    }
    update( blog: any ) {
        return this.http.put( `${this.subPath}`, blog );
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