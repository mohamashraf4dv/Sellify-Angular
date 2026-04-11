import { Component, computed, inject, input, output, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { A11yModule } from "@angular/cdk/a11y";
import { MatDivider } from '@angular/material/divider';
import {MatProgressBar} from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { SellerInfo } from '../seller-info/seller-info';
import { Product } from '../../view-models/product/product';
import { AllProducts } from '../../view-models/get-all-products/get-all-products';
import { environment } from '../../../environments/environment.development';
import { TitleCasePipe } from '@angular/common';
import { CartProductVm } from '../../view-models/cart-product-vm/cart-product-vm';
import { CartService } from '../../services/cart/cart-service';
import { AuthService } from '../../services/auth/auth-service';
import { UserJwt } from '../../view-models/user-jwt/user-jwt';
@Component({
  selector: 'app-home-product',
  imports: [MatCardModule, MatButtonModule, MatIcon, A11yModule, MatDivider, MatProgressBar,RouterLink,SellerInfo,TitleCasePipe],
  templateUrl: './home-product.html',
  styleUrl: './home-product.scss',
})
export class HomeProduct {
  private readonly _cartService = inject(CartService);
  private readonly _authService = inject(AuthService);

  protected userSignal = computed<UserJwt|null|undefined>(()=> this._authService.userSignal());
  lowStockCount: number = 5; // You can adjust this as needed --> it will reflect the low stock status when the stock is below this number
  totalInitialStock: number = 100; // You can set this to the initial stock value for the product, it will be used to calculate the percentage for the progress bar
  // checked: boolean = false;
  productCheckedChange = output<string>();
  wishlisted = input(false);
  checked = signal(this.wishlisted())

  url = environment.fileDomainUrl;
  product = input<AllProducts>();
  cartItem = computed(() => this._cartService.getCartItemById(this.product()?.id ?? ''));
  isStockLimitReached = computed(() => this._cartService.isStockLimitReached(this.product()?.id ?? ''));
  sellerInfo = computed(()=>{
    return {
      img: `${this.url}/${this.product()?.sellerImage}`,
      name: this.product()?.sellerFullName ,
      sold: this.product()?.totalSold ,
      productName: this.product()?.productName
    }
  });
  addToCart(){
    const cartProduct: CartProductVm = {
      id: this.product()?.id || '',
      name: this.product()?.productName || '',
      price: this.product()?.price || 0,
      quantity: this._cartService.getCartItemById(this.product()?.id ?? '')?.quantity || 1,
      imageUrl: `${this.url}/${this.product()?.thumbnailSource}`,
      stock: this.product()?.stock || 0,
      rowVersion:this.product()?.rowVersion || ''
    };
    this._cartService.addToCart(cartProduct);
    // console.log(this.product());
   console.log(this._cartService.cartItemsCount());
     // This will trigger the computed property to update the cart item count in the header
  }

  updateWishlistState(productId:string|undefined)
  {
    if(productId == undefined)
      return;
    
    this.productCheckedChange.emit(productId);
    this.checked.update(prev=> !prev);
    console.log(this.checked())
  }
}
