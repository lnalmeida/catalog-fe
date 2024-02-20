import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Category } from 'src/models/Category';
import { AuthService } from './auth.service';


const apiUrl = 'https://localhost:7211/categories';
const apiLoginUrl = 'https://localhost:7211/api/Auth/login';
var token = "";
var httpOptions = {headers: new HttpHeaders({"Content-Type":"application/json"})};

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor( private http: HttpClient, private authService: AuthService) { }

  getAllCategories(): Observable<Category[]> {
    httpOptions = {headers: this.authService.assemblyHeaderToken()};
    return this.http.get<Category[]>(apiUrl, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategories(pageNumber: number, pageSize: number): Observable<Category[]> {
    httpOptions = {headers: this.authService.assemblyHeaderToken()};
    let paginatedApiUrl = apiUrl +`?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<Category[]>(paginatedApiUrl, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: string): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Category>(url, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Category>(`getCategory id = ${id}`))
      );
  }

  addCategory(category: Category): Observable<Category> {
    const httpOptions = { headers: this.authService.assemblyHeaderToken() };
    return this.http.post<Category>(apiUrl, category, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Category>('addCategory'))
      );
  }

  updateCategory(id: string, category: Category): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, category, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('updateCategory'))
      )
  }

  deleteCategory(id: string): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Category>(url, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Category>('deleteCategory'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
};
