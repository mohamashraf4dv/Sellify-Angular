import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-inventory-manager',
  imports: [CurrencyPipe,MatIcon],
  templateUrl: './inventory-manager.html',
  styleUrl: './inventory-manager.scss',
})
export class InventoryManager {
    products = signal([
    { id: 1, name: 'Premium Wireless Headphones', price: 199, quantity: 45 },
    { id: 2, name: 'Mechanical Gaming Keyboard', price: 120, quantity: 4 },
    { id: 3, name: 'Ergonomic Desk Chair', price: 350, quantity: 12 }
  ]);
}
