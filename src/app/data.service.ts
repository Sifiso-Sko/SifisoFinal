import { Injectable } from '@angular/core';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public first: string= "";
  public prev: string="";
  public next: string="";
  public last: string= "";

  parseLinkHeader(header) {
    if (header.length == 0){
      return;
    }
  }

  
  // let parts = header.split(',');
  // var links = {};
  // parts.array.forEach(element => {
    
  // });
}
