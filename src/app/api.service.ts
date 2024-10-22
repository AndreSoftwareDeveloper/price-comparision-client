import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, map, Observable, throwError } from "rxjs";

export class LoginResponse {
    access_token: string;
    token_type: string;
    
    constructor(access_token: string, token_type: string) {
      this.access_token = access_token;
      this.token_type = token_type;
    }
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private api_endpoint = 'http://127.0.0.1:8000';
    private register_endpoint = 'http://127.0.0.1:8000/register';
    private login_endpoint = 'http://127.0.0.1:8000/login';
    private account_activation_endpoint = 'http://127.0.0.1:8000/check_token'

    constructor(private http: HttpClient) {}
    
    getOffers(nameOrCategory: string): Observable<any> {
        const params = new HttpParams().set('name_or_category', nameOrCategory);
        return this.http.get<any>(`${this.api_endpoint}`, { params });
    }

    signUp(userData: any) {
        return this.http.post(this.register_endpoint, userData).pipe(
            map((response) => {
                return response;
            }),
            catchError((httpError) => {
              console.error(httpError);
              return throwError(() => httpError.status);
            })
        );
    }

    signIn(userData: any) {    
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http.post<LoginResponse>(this.login_endpoint, userData, { headers }).pipe(
          map((response) => {
            return response;
          }),
          catchError((httpError) => {
            const errorMessage = httpError.error?.detail || 'An error occurred while logging in.';
            return throwError(() => new Error(errorMessage));
          })
        );
      }

      checkActivationToken(token: string) {
        const params = new HttpParams().set('activation_token', token);
        return this.http.post(`${this.account_activation_endpoint}`, {}, { params }).pipe(
            map((response) => {
              return response;
            }),
            catchError((error) => {
              return error;
            })
        );
      }
}
