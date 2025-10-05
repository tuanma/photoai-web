import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TransactionService {
	private subPath = `${api.baseUrlApi}/transaction`;
    constructor(private http: HttpClient) { }
	
    getById(id: string) {
        return this.http.get(`${this.subPath}/${id}`);
    }
    
    list( transaction: any ) {
		var queryString = Object.keys(transaction).map(key => key + '=' + transaction[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}/list?` + queryString);
    }
	
    create( transaction: any ) {
        return this.http.post( `${this.subPath}`, transaction );
    }
    update( transaction: any ) {
        return this.http.put( `${this.subPath}`, transaction );
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