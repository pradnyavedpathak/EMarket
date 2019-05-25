import { Injectable } from '@angular/core';
import { IProduct } from './IProduct';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:3000/products';

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service.');
  }

  getProduct(Product_Id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.baseUrl}/${Product_Id}`)
      .pipe(catchError(this.handleError));
}

addProduct(product: IProduct): Observable<IProduct> {
  console.log(product);
  return this.httpClient.post<IProduct>(this.baseUrl, product, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
  .pipe(catchError(this.handleError));
}

updateProduct(product: IProduct): Observable<void> {
  console.log(product);
  return this.httpClient.put<void>(`${this.baseUrl}/${product.Product_Id}`, product, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })

      .pipe(catchError(this.handleError));
}

// tslint:disable-next-line: variable-name
deleteProduct(Product_Id: number): Observable<void> {
  console.log(Product_Id);
  return this.httpClient.delete<void>(`${this.baseUrl}/${Product_Id}`)
    .pipe(catchError(this.handleError));
  }
}
