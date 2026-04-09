import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
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

    paymentIntent(orderData: any) {
    // Here you would typically make an HTTP POST request to your backend API to place the order
    const totalAmount = 100000;
    return this._httpClient.get(`${this.apiUrl}/Payment/StripeSecret`, {params: {totalAmount}});
  }
}
