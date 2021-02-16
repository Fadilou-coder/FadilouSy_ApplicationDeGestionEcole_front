import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  authenticate(email: string, password: string){
    return this.http.post(this.baseUrl + '/login', {
      email, password
   });
  }
}

