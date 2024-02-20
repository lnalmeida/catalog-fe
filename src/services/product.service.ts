import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Product } from 'src/models/Product';
import { AuthService } from './auth.service';

const apiUrl = 'https://localhost:7211/products';
const apiLoginUrl = 'https://localhost:7211/api/Auth/login';
var token = "";
var httpOptions = {headers: new HttpHeaders({"Content-Type":"application/json"})};

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor( private http: HttpClient, private authService: AuthService) { }

 getallProducts(): Observable<Product[]> {
    httpOptions = {headers: this.authService.assemblyHeaderToken()};
    return this.http.get<Product[]>(apiUrl, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProducts(pageNumber: number, pageSize: number): Observable<Product[]> {
    httpOptions = {headers: this.authService.assemblyHeaderToken()};
    let paginatedApiUrl = apiUrl +`?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<Product[]>(paginatedApiUrl, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: string): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Product>(`getProduct id = ${id}`))
      );
  }

  addProduct(product: Product): Observable<Product> {
    const httpOptions = { headers: this.authService.assemblyHeaderToken() };
    return this.http.post<Product>(apiUrl, product, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  updateProduct(id: string, product: Product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('updateProduct'))
      )
  }

  deleteProduct(id: string): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Product>('deleteProduct'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
};
