import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  

  //Atributo URL
   private URL: string = 'https://proyecto-5-4ae54-default-rtdb.firebaseio.com/collection.json';

   constructor(private http:HttpClient) { }

   getResponse() {
    return this.http.get(this.URL);
}

}
