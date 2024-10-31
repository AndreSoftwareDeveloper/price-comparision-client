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
    private account_verification_endpoint = 'http://127.0.0.1:8000/verify_account'

    constructor(private http: HttpClient) {}
    
    searchOffers(nameOrCategory: string): Observable<any> {
        const params = new HttpParams().set('name_or_category', nameOrCategory);
        return this.http.get<any>(`${this.api_endpoint}`, { params });
    }

    signUp(userData: any) {
        return this.http.post(this.register_endpoint, userData).pipe(
            map((response) => {
                return response;
            }),
            catchError((httpError) => {
              return throwError(() => httpError);
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
          catchError(() => {
            const errorMessage = 'Incorrect email or password.';
            return throwError(() => new Error(errorMessage));
          })
        );
      }

      checkVerificationToken(token: string) {
        const params = new HttpParams().set('verification_token', token);
        return this.http.post(this.account_verification_endpoint, {}, { params }).pipe(
            map((response) => {
              return response;
            }),
            catchError((error) => {
              return throwError(() => new Error(error.message));
            })
        );
      }
}
