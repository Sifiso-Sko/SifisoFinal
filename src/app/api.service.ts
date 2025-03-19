import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL ="http://localhost:3000/products";
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {

    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent){
      // Client side errors
      errorMessage= `Error: ${error.error.message}`;
    }else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    
    window.alert(errorMessage);
    return throwError(errorMessage);

    }
  
  public sendGetRequest(){
    return this.httpClient.get<any[]>(this.SERVER_URL).pipe(catchError(this.handleError));
  }
  
  

  // public get(): Observable<any[]>{
  //   // return this.httpClient.get<any[]>(this.SERVER_URL).pipe(catchError());
  //   return this.httpClient.get<any[]>(this.SERVER_URL);
  // }
}
