import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProductService {
	private subPath = `${api.baseUrlApi}/product`;
    constructor(private http: HttpClient) { }
	
    getById(id: number) {
        return this.http.get(`${this.subPath}/${id}`);
    }
    
    list( product: any ) {
		var queryString = Object.keys(product).map(key => key + '=' + product[key]).join('&');
		console.log(queryString);
		return this.http.get<any[]>(`${this.subPath}/list?` + queryString);
    }

	payment( payment: any ) {
	    return this.http.post( `${this.subPath}/payment`, payment );
	}
	
    create( product: any ) {
        return this.http.post( `${this.subPath}`, product );
    }
    update( product: any ) {
        return this.http.put( `${this.subPath}`, product );
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