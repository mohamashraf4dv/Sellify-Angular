import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserWishlistProductVm } from '../../../view-models/user-wishlist-product-vm/user-wishlist-product-vm';
import { Observable } from 'rxjs';
import { GenericTypeResponse } from '../../../view-models/generic-response/generic-response';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _httpClient = inject(HttpClient)
  getUserWishlistProducts():Observable<GenericTypeResponse<UserWishlistProductVm[]>>{
    return this._httpClient.get<GenericTypeResponse<UserWishlistProductVm[]>>(`${environment.url}/Wishlist`,{withCredentials:true});
  }
}
