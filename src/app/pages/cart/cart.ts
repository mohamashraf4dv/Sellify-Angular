import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductVm } from '../../view-models/cart-product-vm/cart-product-vm';
import { CartService } from '../../services/cart/cart-service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly _cartService = inject(CartService);

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'actions'];
  
  // cartItems: CartProductVm[] = [
  //   { id: "1", name: 'Wireless Headphones', price: 99, quantity: 1, imageUrl: 'https://via.placeholder.com/50' ,stock: 20},
  //   { id: "2", name: 'Smart Watch', price: 199, quantity: 1, imageUrl: 'https://via.placeholder.com/50',stock: 10 },
  // ];
  cartItems = computed<CartProductVm[]>(() => this._cartService.cartItems());
  cartItemsCount = computed(() => this._cartService.cartItemsCount());
  // Calculate the grand total
  get totalAmount(): number {
    return this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  updateQuantity(item: CartProductVm, change: number) {
    const newQty = item.quantity + change;
    if (newQty > 0 && newQty <= item.stock) {
      this._cartService.updateCartItemQuantity(item.id, newQty);
    }
  }

  removeItem(id: string) {
    this._cartService.removeFromCart(id);
  }

  submitPayment() {
    console.log('Processing payment for: $', this.totalAmount);
    alert('Proceeding to payment gateway...');
  }
}

