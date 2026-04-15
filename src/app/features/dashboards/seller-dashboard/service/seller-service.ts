import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Product } from '../../../../view-models/product/product';
import { GenericTypeResponse } from '../../../../view-models/generic-response/generic-response';
import { SellerOrderVm } from '../../../../view-models/seller-order-vm/seller-order-vm';

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
  public updateProducts(products: any[]){
          return this._httpClient.put(`${environment.url}/Seller/Products`, products, {withCredentials:true})
  }
  public getOrders(){
        return this._httpClient.get<GenericTypeResponse<SellerOrderVm[]>>(`${environment.url}/Seller/Orders`, {withCredentials:true});
  }
}
