import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../view-models/product/product';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private readonly _httpClient = inject(HttpClient);

  public requestToBeSeller(){
          return this._httpClient.post(`${environment.url}/Seller/Apply`,null,{withCredentials:true})
  }
  public addNewProduct(productData: any){
          return this._httpClient.post(`${environment.url}/Product`, productData, {withCredentials:true})
  }
}
