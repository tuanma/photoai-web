import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

export interface Example {
  id?: number;
  photoUrl?: string | any;
  template?: string;
  modelId?: string;
  prompt?: string;
  manualPrompt?: string;
  negativePrompt?: string;
  statusFlag?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http: HttpClient) { }

  // Get list of examples with pagination and filters
  getExamples(page: number = 1, size: number = 20, statusFlag?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    let url = `${api.baseUrlApi}/examples?page=${page}&size=${size}`;
    if (statusFlag) {
      url += `&statusFlag=${statusFlag}`;
    }
    
    return this.http.get(url, { headers });
  }

  // Search examples by query
  searchExamples(query: string, page: number = 1, size: number = 20): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const url = `${api.baseUrlApi}/examples/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}&statusFlag=ACTIVE`;
    return this.http.get(url, { headers });
  }
}

