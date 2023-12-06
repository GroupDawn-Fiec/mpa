import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http:HttpClient) { }

  //Atributo URL
   private URL: string = 'https://proyecto5.firebaseio.com/collection.json';

   getResponse() {
          return this.http.get(this.URL);
  }
  
}
