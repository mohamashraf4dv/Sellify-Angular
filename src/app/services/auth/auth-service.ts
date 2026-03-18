import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {jwtDecode} from 'jwt-decode'
import { UserJwt } from '../../view-models/user-jwt/user-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient:HttpClient =inject(HttpClient);
  userAccessToken:WritableSignal<string|null>= signal(localStorage.getItem("auth"));
  userData:WritableSignal<any> = signal(this.userAccessToken() ?? localStorage.getItem("auth"))
  userSignal = computed(()=>  (this.userData == null)?  null :jwtDecode<UserJwt>(this.userData()));
  // signInInternally(loginIdentifier: string, password: string,isPersistence:boolean):Observable<any> {
  //   return this._httpClient.post(`${environment.url}/Authentication/login`, { loginIdentifier, password ,isPersistence})
  // }
  
    signInInternally(loginIdentifier: string, password: string,isPersistence:boolean):Observable<any> {
    return this._httpClient.post(`${environment.url}/Authentication/test-login`, { loginIdentifier, password ,isPersistence},{withCredentials:true})
  }

      test():Observable<any> {
    return this._httpClient.get(`${environment.url}/Token/User`,{withCredentials:true})
  }

    refreshToken():Observable<any>{
      return this._httpClient.post(`${environment.url}/Token/refresh`,null,{withCredentials:true})
    }
}
