import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from '../models/institution.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private apiUrl = 'http://localhost:8080/api/institutions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl + '/');
  }

  getById(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.apiUrl}/${id}/`);
  }

  create(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.apiUrl + '/', institution);
  }

  update(id: number, institution: Institution): Observable<Institution> {
    return this.http.put<Institution>(`${this.apiUrl}/${id}/`, institution);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/`);
  }

  search(query: string): Observable<Institution[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<Institution[]>(this.apiUrl + '/', { params });
  }

  getByState(state: string): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.apiUrl}/by_state/?state=${state}`);
  }
}