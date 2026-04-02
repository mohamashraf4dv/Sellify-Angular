import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  imports: [CurrencyPipe],
  templateUrl: './view-orders.html',
  styleUrl: './view-orders.scss',
})
export class ViewOrders {
    orders = signal([
    { id: '7721', customer: 'John Doe', total: 240.00, status: 'Processing' },
    { id: '7719', customer: 'Sarah Smith', total: 120.00, status: 'Shipped' },
    { id: '7718', customer: 'Mike Ross', total: 85.50, status: 'Delivered' }
  ]);
}
