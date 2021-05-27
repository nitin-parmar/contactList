import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API : string = "https://60ac9dff9e2d6b0017457815.mockapi.io/ag/contacts"

  constructor( private http: HttpClient ) { }

  getContact(){
    return this.http.get(this.API, {observe: 'response'})
  }

}
