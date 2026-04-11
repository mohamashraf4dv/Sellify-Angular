import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { InventoryProducts } from '../../view-models/inventory-products/inventory-products';
import { GenericTypeResponse } from '../../view-models/generic-response/generic-response';
import { GetAllProducts } from '../../view-models/get-all-products/get-all-products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _httpClient = inject(HttpClient);

  getProductsBySellerId(sellerId?: string) :Observable<GenericTypeResponse<InventoryProducts[]>>{
    // Implement the logic to fetch products by seller ID
    if(sellerId === null || sellerId === undefined) {
      return this._httpClient.get<GenericTypeResponse<InventoryProducts[]>>(`${environment.url}/Seller/Products`);
    } 
    else {
      return this._httpClient.get<GenericTypeResponse<InventoryProducts[]>>(`${environment.url}/Seller/Products?sellerId=${sellerId}`, { withCredentials: true });
    }
  }

  getProducts(page:number=1 ,number: number=11): Observable<GenericTypeResponse<GetAllProducts>> {
    const params = {
      page: page,
      number: number
    }
    return this._httpClient.get<GenericTypeResponse<GetAllProducts>>(`${environment.url}/Product`, { params });
  }

  updateWishlistStatus(productId:string ){
    const obj = {productId}
    return this._httpClient.put(`${environment.url}/Wishlist`,obj, {withCredentials:true});
  }

}

