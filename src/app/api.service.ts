import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private api_endpoint = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) {}
    
    getOffers(nameOrCategory: string): Observable<any> {
        const params = new HttpParams().set('name_or_category', nameOrCategory);
        return this.http.get<any>(`${this.api_endpoint}`, { params });
      }
}
