import { Component, effect, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WishlistService } from '../../../services/wishlist/wishlist-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserWishlistProductVm } from '../../../view-models/user-wishlist-product-vm/user-wishlist-product-vm';
import { environment } from '../../../../environments/environment.development';
import { GenericTypeResponse } from '../../../view-models/generic-response/generic-response';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../services/product/product-service';
import { CartService } from '../../../services/cart/cart-service';
import { CartProductVm } from '../../../view-models/cart-product-vm/cart-product-vm';
@Component({
  selector: 'app-wishlist-products',
  imports: [MatIcon,DatePipe],
  templateUrl: './wishlist-products.html',
  styleUrl: './wishlist-products.scss',
})



export class WishlistProducts {
  private readonly _wishlistService = inject(WishlistService)
  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)

  // Using Signals for reactive state
  protected enviroment = environment;
  wishListedItems = toSignal<GenericTypeResponse<UserWishlistProductVm[]>>(this._wishlistService.getUserWishlistProducts());
  wishListItems = signal<UserWishlistProductVm[]>(this.wishListedItems()?.data ?? [] as UserWishlistProductVm[])

  wishListItemsEffect = effect(()=>{
    const data = this.wishListedItems()?.data
    if( data )
      this.wishListItems.set(data)
  })
  removeItem(id: string) {
    this.wishListItems.update(items => items?.filter(item => item.productId !== id));
    this._productService.updateWishlistStatus(id).subscribe({
      next: res=> console.log(res),
      error: (err)=> console.log(err)
    })
  }

  addToCart(item: UserWishlistProductVm) {
    // console.log('Adding to cart:', item.name);
    console.log(this.wishListedItems());

    // Logic for cart integration goes here
        const cartProduct: CartProductVm = {
          id: item.productId || '',
          name: item.productName || '',
          price: item.productPrice || 0,
          quantity: this._cartService.getCartItemById(item.productId ?? '')?.quantity || 1,
          imageUrl: `${this.enviroment.fileDomainUrl}/${item.thumbnailSource}`,
          stock: item?.stock || 0,
          // rowVersion:this.product()?.rowVersion || ''
        };
        this._cartService.addToCart(cartProduct);
  }
  continueShopping(){
    console.log(this.wishListItems())
    // console.log(this.wishListedItems())
  }

  isStockLimitReachedInCart(productId:string){
    return this._cartService.isStockLimitReached(productId);
  }
}
