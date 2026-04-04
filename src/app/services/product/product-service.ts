import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { InventoryProducts } from '../../view-models/inventory-products/inventory-products';
import { GenericTypeResponse } from '../../view-models/generic-response/generic-response';

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

}

