import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductVm } from '../../view-models/cart-product-vm/cart-product-vm';
import { CartService } from '../../services/cart/cart-service';
import { inject } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly _cartService = inject(CartService);
  private readonly _orderService = inject(OrderService);
  private readonly _router = inject(Router);
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
    const order: { [key: string]: { quantity: number; price: number; } } = {};
    const productsIds = [] as string[];
    this.cartItems().forEach(item=>{ 
      productsIds.push(item.id)
      // return {productId:item.id,quantity: item.quantity , price:item.price, rowVersion:item.rowVersion}
      order[item.id]= {price:item.price,quantity:item.quantity}
    })
    // Call the order service to place the order
    console.log({order, productsIds});
    // const orderSubscription = this._orderService.placeOrder({order, productsIds}).subscribe({
    const orderSubscription = this._orderService.getPaymentSessionUrl({order, productsIds}).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        window.location.href = response.data
      },
      error: (error) => {
        console.error('Error placing order:', error);
      }
      ,complete: () => {
        console.log('Order placement process completed.');
        this._cartService.clearCart();
        orderSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
      }
    });

  }
}

