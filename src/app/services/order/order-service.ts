import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GenericResponse, GenericTypeResponse } from '../../view-models/generic-response/generic-response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  _httpClient = inject(HttpClient);
  private apiUrl = environment.url; // Base URL for your API, you can set this in your environment files
  // Example method to place an order
  placeOrder(orderData: any) {
    // Here you would typically make an HTTP POST request to your backend API to place the order
    return this._httpClient.post(`${this.apiUrl}/order`, orderData);
  }

    getPaymentSessionUrl(orderData: any) : Observable<GenericTypeResponse<string> > {
    return this._httpClient.post<GenericTypeResponse<string>>(`${this.apiUrl}/order`, orderData);
  }

    finalizePaymentSession(sessionId: any) : Observable<GenericResponse> {
    return this._httpClient.post<GenericResponse>(`${this.apiUrl}/order/success`, {sessionId});
  }
}
