// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/models/User';
import { Router, Routes } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const apiLoginUrl = 'https://localhost:7211/api/Auth/login';
var token = "";
var httpOptions = { headers: new HttpHeaders({ "content-type": "application/json" }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtToken: string = "";

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<User> {
    return  this.http.post<User>(apiLoginUrl, user)
      .pipe(
        tap((user: User) => {
          console.log(`User ${user.email} logged in.`);
          const role: any = this.getRoleFromToken(user.token);
          this.setToken(user.token, role);
          this.setLoggedIn(true);
        }),
        catchError(this.handleError<User>('Login'))
      );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  logout(){
    this.clearLocalStorage();
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  assemblyHeaderToken(): HttpHeaders {
    token = localStorage.getItem("jwt") ?? "";
    return new HttpHeaders({ "Authorization": `Bearer ${token}`, "content-type": "application/json" });
  }

  private setToken(jwtToken: string, role: string): void {
    localStorage.setItem("jwt", token);
    localStorage.setItem("role", role)
  }

  clearLocalStorage(): void {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getRoleFromLocalStorage(): string | null {
    let role = localStorage.getItem("role");
    if(role) {
      return role;
    } else {
      return null;
    }
  }

  getRoleFromToken(token: string): string {
    if(token){
      const decodedToken: any = jwtDecode(token);
      return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } else {
      return "anonymous";
    }
  }


}
