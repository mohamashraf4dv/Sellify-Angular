import { computed, Injectable, signal } from '@angular/core';
import { CartProductVm } from '../../view-models/cart-product-vm/cart-product-vm';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartProductVm[]>([] as CartProductVm[]);
  cartItemsCount = computed(() => this.cartItems().length);

  addToCart(product: CartProductVm) {
    if(this.isAlreadyInCart(product.id) && !this.isStockLimitReached(product.id)) {
      console.log('Product already in cart, increasing quantity');
      console.log('Current quantity:', product.quantity, 'Stock:', product.stock);
      this.cartItems.update(items => items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      (product.quantity < product.stock) ?
      this.updateCartItemQuantity(product.id, product.quantity+1) : null;

    } else if (!this.isAlreadyInCart(product.id)) {
      console.log('Not in Cart');
      this.cartItems.update(items => [...items, product]);

    }
    else{
            console.log('Product already in cart and reached stock limit');
    }
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }
  updateCartItemQuantity(productId: string, newQuantity: number) {
    this.cartItems.update(items => items.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  }
  getCartItemById(productId: string): CartProductVm | undefined {
    return this.cartItems().find(item => item.id === productId);
  }
  isAlreadyInCart(productId: string): boolean {
    return this.cartItems().some(item => item.id === productId);
  }
  isStockLimitReached(productId: string): boolean {
    const item = this.getCartItemById(productId);
    return item ? item.quantity >= item.stock : false;
  }
}
