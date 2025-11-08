import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

export interface Camera {
  id?: number;
  photoId?: string;
  photoUrl?: string;
  preprocessedPhotoUrl?: string;
  template?: string;
  modelId?: string;
  manualPrompt?: string;
  status?: string;
  flux?: number;
  realism?: number;
  epochQueued?: number;
  epochFinished?: number;
  createDate?: string;
  updateDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }

  // Get list of cameras with pagination and filters
  getCameras(page: number = 1, size: number = 20, statusFlag?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    let url = `${api.baseUrlApi}/cameras?page=${page}&size=${size}`;
    if (statusFlag) {
      url += `&statusFlag=${statusFlag}`;
    }
    
    return this.http.get(url, { headers });
  }

  // Search cameras by query
  searchCameras(query: string, page: number = 1, size: number = 20): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const url = `${api.baseUrlApi}/cameras/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}&statusFlag=ACTIVE`;
    return this.http.get(url, { headers });
  }
}


