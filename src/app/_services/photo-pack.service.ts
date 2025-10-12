import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

export interface PhotoPack {
  id: string;
  title: string;
  description: string;
  icon: string;
  photoCount: number;
  usageCount: number;
  previewImages: string[];
  category: string;
  status: string;
  position: number;
  createDate: string;
  updateDate: string;
}

export interface PhotoPackResponse {
  status: string;
  message: string;
  data: PhotoPack[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoPackService {

  constructor(private http: HttpClient) { }

  /**
   * Get all photo packs
   */
  getPhotoPacks(page: number = 1, size: number = 20): Observable<PhotoPackResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PhotoPackResponse>(`${api.baseUrlApi}/photo-packs?page=${page}&size=${size}`, { headers });
  }

  /**
   * Get photo pack by ID
   */
  getPhotoPackById(id: string): Observable<PhotoPack> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PhotoPack>(`${api.baseUrlApi}/photo-packs/${id}`, { headers });
  }

  /**
   * Search photo packs
   */
  searchPhotoPacks(query: string, page: number = 1, size: number = 20): Observable<PhotoPackResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PhotoPackResponse>(`${api.baseUrlApi}/photo-packs/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`, { headers });
  }

  /**
   * Get photo packs by category
   */
  getPhotoPacksByCategory(category: string, page: number = 1, size: number = 20): Observable<PhotoPackResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PhotoPackResponse>(`${api.baseUrlApi}/photo-packs/category/${category}?page=${page}&size=${size}`, { headers });
  }

  /**
   * Get popular photo packs
   */
  getPopularPhotoPacks(limit: number = 10): Observable<PhotoPackResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<PhotoPackResponse>(`${api.baseUrlApi}/photo-packs/popular?limit=${limit}`, { headers });
  }
}
