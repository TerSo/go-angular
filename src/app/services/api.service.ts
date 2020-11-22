import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;
  httpOptions: any;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.serverUrl;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'}) 
    };
  }

  getHomeInfo():any {
    return this.http.get(this.baseUrl,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
     
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}, `+ 
        `message: ${error.message}`
      );
    }
    
    // return an observable with a user-facing error message
    return throwError(error);
    }

}
