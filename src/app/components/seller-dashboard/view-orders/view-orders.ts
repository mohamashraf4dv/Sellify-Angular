import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-orders',
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './view-orders.html',
  styleUrl: './view-orders.scss',
})
export class ViewOrders {
  // getItems = toSignal()
// Mocking the Base URL for images
  url = 'https://api.example.com/images'; 

  // Using a Signal to store the mock orders
  orders = signal<any[]>([
    {
      orderId: 'ORD-7721-XP',
      date: new Date('2026-04-12T10:30:00'),
      totalAmount: 2450.00,
      items: [
        {
          name: 'Minimalist Leather Watch',
          productImage: 'watch-tan.jpg', // Mock filename
          quantity: 1,
          price: 1200.00
        },
        {
          name: 'Mechanical Keyboard G-Pro',
          productImage: 'keyboard.jpg',
          quantity: 1,
          price: 1250.00
        }
      ]
    },
    {
      orderId: 'ORD-8842-LQ',
      date: new Date('2026-04-13T14:15:00'),
      totalAmount: 180.00,
      items: [
        {
          name: 'Ceramic Coffee Mug',
          productImage: 'mug-blue.jpg',
          quantity: 3,
          price: 60.00
        }
      ]
    },
    {
      orderId: 'ORD-9910-ZM',
      date: new Date('2026-04-14T09:00:00'),
      totalAmount: 450.00,
      items: [
        {
          name: 'Wireless Charging Pad',
          productImage: 'charger.jpg',
          quantity: 2,
          price: 225.00
        }
      ]
    }
  ]);
}
