import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient:HttpClient =inject(HttpClient);

  // signInInternally(loginIdentifier: string, password: string,isPersistence:boolean):Observable<any> {
  //   return this._httpClient.post(`${environment.url}/Authentication/login`, { loginIdentifier, password ,isPersistence})
  // }

    signInInternally(loginIdentifier: string, password: string,isPersistence:boolean):Observable<any> {
    return this._httpClient.post(`${environment.url}/Authentication/test-login`, { loginIdentifier, password ,isPersistence},{withCredentials:true})
  }
}
