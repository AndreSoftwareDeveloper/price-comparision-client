import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

import { DataResponse } from "./models/data-response.model";
import { User } from "./models/user.model";
import { ApiResponse } from "./models/api-response.model";
import { PriceUpdateData } from "./models/price-update-data.model";
import { LoginResponse } from "./models/login-response.model";
import { Offer } from "./models/offer.model";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private api_base_endpoint = 'http://127.0.0.1:8000';

    private api_endpoints = {
      register: `${this.api_base_endpoint}/register`,
      login: `${this.api_base_endpoint}/login`,
      account_verification: `${this.api_base_endpoint}/verify_account`,
      add_offer: `${this.api_base_endpoint}/add_offer`
    };

    constructor(private http: HttpClient) {}
    
    searchOffers(name: string): Observable<DataResponse> {
      const params = new HttpParams().set('name', name);
      return this.http.get<DataResponse>(
        `${this.api_base_endpoint}`, 
        { params }
      );
    }

    signUp(userData: User) {
      return this.http.post(this.api_endpoints.register, userData).pipe(
        map(
          (response) => response
        ),
        catchError((httpError) => {
          return throwError(() => httpError);
        })
      );
    }

    signIn(userData: string) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      return this.http.post<LoginResponse>(
        this.api_endpoints.login, userData, { headers }
      ).pipe(
          map(
            (response) => response
          ),
          catchError(() => {
            const errorMessage = 'Incorrect email or password.';
            return throwError(() => new Error(errorMessage));
          })
      );
    }

    checkVerificationToken(token: string) {
      const params = new HttpParams().set('verification_token', token);
      return this.http.post(
        this.api_endpoints.account_verification, {}, { params }
      ).pipe(
          map(
            (response) => response
          ),
          catchError((error) => {
            return throwError(() => new Error(error.message));
          })
      );
    }

    updatePrice(updateData: PriceUpdateData) {
      return this.http.patch<ApiResponse>(this.api_base_endpoint, updateData).pipe(
        map(
          (response) => response          
        ),
        catchError(
          (error) => {
            return throwError(
              () => new Error(error.message)
            );
          }
        )
      );
    }

    addOffer(offer: Offer) {
      const formData = new FormData();
      formData.append('shop', offer.shop);
      formData.append('price', offer.price.toString());
      formData.append('name', offer.name);

      if (offer.image)
        formData.append('image', offer.image);      
    
      return this.http.post(this.api_endpoints.add_offer, formData).pipe(
        map(
          (response) => response     
        ),
        catchError(
          (error) => {
            console.log(error);
            return throwError(
              () => new Error(error.message)
            );
          }
        )
      );
    }
}
