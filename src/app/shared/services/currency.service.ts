import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency(apiKey: string, valueTo: string, valueFrom: string, amount: number) {
    
    let queryParams = new HttpParams()
      .set('apikey', apiKey)
      .set('to', valueTo)
      .set('from', valueFrom)
      .set('amount', amount)
    
    return this.http.get<any>(environment.url, { params: queryParams, });

  }
}


