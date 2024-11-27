import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

import { DataResponse } from "./models/data-response.model";
import { User } from "./models/user.model";
import { ApiResponse } from "./models/api-response.model";
import { PriceUpdateData } from "./models/price-update-data.model";
import { LoginResponse } from "./models/login-response.model";
import { Dupa } from "./modal-add-offer/modal-add-offer.component";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private api_endpoint = 'http://127.0.0.1:8000';
    private register_endpoint = 'http://127.0.0.1:8000/register';
    private login_endpoint = 'http://127.0.0.1:8000/login';
    private account_verification_endpoint = 'http://127.0.0.1:8000/verify_account'
    private add_offer_endpoint = 'http://127.0.0.1:8000/add_offer';

    constructor(private http: HttpClient) {}
    
    searchOffers(name: string): Observable<DataResponse> {
      const params = new HttpParams().set('name', name);
      return this.http.get<DataResponse>(
        `${this.api_endpoint}`, { params }
      );
    }

    signUp(userData: User) {
      return this.http.post(this.register_endpoint, userData).pipe(
        map((response) => {
          return response;
        }),
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
        this.login_endpoint, userData, { headers }
      ).pipe(
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
      return this.http.post(
        this.account_verification_endpoint, {}, { params }
      ).pipe(
        map((response) => {
          return response
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        })
      );
    }

    updatePrice(updateData: PriceUpdateData) {
      return this.http.patch<ApiResponse>(this.api_endpoint, updateData).pipe(
        map(
          (response) => {
            return response
          }
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

    addOffer(offer: Dupa) {
      const formData = new FormData();
      formData.append('shop', offer.shop);
      formData.append('price', offer.price.toString());
      formData.append('name', offer.name);

      if (offer.image)
        formData.append('image', offer.image);      
    
      return this.http.post(this.add_offer_endpoint, formData).pipe(
        map(
          (response) => {
            return response;
          }
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
