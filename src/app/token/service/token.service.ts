import { Injectable } from '@angular/core';
import { TokenClass } from '../Model/token-class';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public setLocalStorageToken(auth: TokenClass): void{
    localStorage.setItem('token', JSON.stringify(auth));
  }
  public getLocalStorageToken(): TokenClass{
    const tokenData = JSON.parse(localStorage.getItem('token') as string);
    return tokenData == null ? null : tokenData;
  }
  public removeLocalStorage(): void{
    localStorage.removeItem('token');
  }
}
