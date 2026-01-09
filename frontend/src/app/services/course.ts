import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl + '/');
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}/`);
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl + '/', course);
  }

  update(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}/`, course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/`);
  }

  search(query: string): Observable<Course[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<Course[]>(this.apiUrl + '/', { params });
  }

  getByStream(stream: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/by_stream/?stream=${stream}`);
  }
}