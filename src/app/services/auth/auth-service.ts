import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {jwtDecode} from 'jwt-decode'
import { UserJwt } from '../../view-models/user-jwt/user-jwt';
import { UserProfile } from '../../view-models/user-profile/user-profile';
import { GenericTypeResponse } from '../../view-models/generic-response/generic-response';
import { UserOrderVm } from '../../view-models/user-order-vm/user-order-vm';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient:HttpClient =inject(HttpClient);

  userAccessToken:WritableSignal<string|null>= signal(localStorage.getItem("auth"));
  userData:WritableSignal<any> = signal(this.userAccessToken() ?? localStorage.getItem("auth"))
  userSignal = computed(()=>  (this.userData() == null)?  null :jwtDecode<UserJwt>(this.userData()));
  dateNow= Date.now()
  expirationInMs = computed(() => Number(this.userSignal()?.exp ?? 0) * 1000);
  delay =  this.expirationInMs() - this.dateNow ;

    signInInternally(loginIdentifier: string, password: string,isPersistence:boolean):Observable<any> {
    return this._httpClient.post(`${environment.url}/Authentication/login`, { loginIdentifier, password ,isPersistence},{withCredentials:true})
  }
      test():Observable<any> {
    return this._httpClient.get(`${environment.url}/Token/User`,{withCredentials:true})
  }

    refreshToken():Observable<any>{
      return this._httpClient.post(`${environment.url}/Token/refresh`,null,{withCredentials:true})
    }
    revokeToken():Observable<any>{
          this.userAccessToken.set(null);
          localStorage.removeItem("auth");
          this.userData.set(null);
      return this._httpClient.post(`${environment.url}/Token/revoke`,null,{withCredentials:true})
    }
    getCurrentUser():Observable<UserProfile>{
    return this._httpClient.get<UserProfile>(`${environment.url}/User`,{withCredentials:true})
    }

    UpdateCurrentUser(body:any):Observable<any>{
    return this._httpClient.put<any>(`${environment.url}/User`,body,{withCredentials:true})
    }
    getOrders(){
      return this._httpClient.get<GenericTypeResponse<UserOrderVm[]>>(`${environment.url}/User/Orders`,{withCredentials:true});
    }
}
