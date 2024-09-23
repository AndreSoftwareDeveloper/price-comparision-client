import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private api_endpoint = 'http://127.0.0.1:8000/register';

    constructor(private http: HttpClient) {}
    
    getOffers(nameOrCategory: string): Observable<any> {
        const params = new HttpParams().set('name_or_category', nameOrCategory);
        return this.http.get<any>(`${this.api_endpoint}`, { params });
    }

    post(userData: any) {
        return this.http.post(this.api_endpoint, userData).pipe(
            map((response) => {
                console.log(response);
                return response;
            }),
            catchError((httpError) => {
                return throwError(httpError.error);
            })
        );
    }
}
