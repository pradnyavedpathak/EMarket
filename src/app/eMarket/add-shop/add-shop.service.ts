import { Injectable } from '@angular/core';
import { IShop } from './IShop';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ShopService {
  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:3000/shops';

  getShops(): Observable<IShop[]> {
    return this.httpClient.get<IShop[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service. We are');
  }

  getShop(Shop_No: number): Observable<IShop> {
    return this.httpClient.get<IShop>(`${this.baseUrl}/${Shop_No}`)
      .pipe(catchError(this.handleError));
}

addShop(shop: IShop): Observable<IShop> {
  console.log(shop);
  return this.httpClient.post<IShop>(this.baseUrl, shop, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
  .pipe(catchError(this.handleError));
}

updateShop(shop: IShop): Observable<void> {
  console.log(shop);
  return this.httpClient.put<void>(`${this.baseUrl}/${shop.Shop_No}`, shop, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })

      .pipe(catchError(this.handleError));
}

deleteShop(Shop_No: number): Observable<void> {
  console.log(Shop_No);
  return this.httpClient.delete<void>(`${this.baseUrl}/${Shop_No}`)
    .pipe(catchError(this.handleError));
  }
}
