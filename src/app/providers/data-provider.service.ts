import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  //Atributo URL
  private URL: string =
    'https://proyecto5v2-default-rtdb.firebaseio.com/collection.json';

  private metadataURL: string =
    'https://dawm-ea406-default-rtdb.firebaseio.com/metadata.json';

  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }

  getMetadataResponse() {
    return this.http.get(this.metadataURL);
  }
}
