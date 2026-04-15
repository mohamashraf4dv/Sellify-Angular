import { CurrencyPipe, Location } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductDetailsReviewCard } from '../product-details-review-card/product-details-review-card';
import { ReviewForm } from '../../../components/review-form/review-form';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, filter, switchMap } from 'rxjs';
import { ProductDetailsVm } from '../../../view-models/product-details-vm/product-details-vm';
import { GenericTypeResponse } from '../../../view-models/generic-response/generic-response';
import { environment } from '../../../../environments/environment.development';
import { UserJwt } from '../../../view-models/user-jwt/user-jwt';
import { MatIcon } from '@angular/material/icon';
import { CartProductVm } from '../../../view-models/cart-product-vm/cart-product-vm';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../service/product-service';
import { CartService } from '../../../core/cart/cart-service';
import { AuthService } from '../../../core/auth/auth-service';
@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, ReviewForm, ProductDetailsReviewCard,MatIcon,MatButtonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
   private readonly _location = inject(Location)
   private readonly _productService = inject(ProductService)
   private readonly _activatedRoute = inject(ActivatedRoute)
   private readonly _cartService = inject(CartService);
   private readonly _authService = inject(AuthService);
   private readonly _matSnackBar = inject(MatSnackBar)

   protected url = environment.fileDomainUrl;
   private _paramMap = toSignal(this._activatedRoute.paramMap);
   protected _id = computed(()=> this._paramMap()?.get("id"));

   private _productDetailsResponse= toSignal<GenericTypeResponse<ProductDetailsVm>>(toObservable(this._id).pipe(switchMap(id => id ? this._productService.getProductById(id) : EMPTY)))
   
   protected _productDetails = computed(()=> this._productDetailsResponse()?.data)
   protected userSignal = computed<UserJwt|null|undefined>(()=> this._authService.userSignal());
   protected canAddToCart = computed(()=>  this._cartService.isStockLimitReached(this._id()|| ''))

  // checked: boolean = false;
  checked = signal(false)
  productDetailsEffect = effect(()=>{
    const productDetails = this._productDetails();
    if(productDetails)
      this.checked.set(productDetails.isWishlisted);
  })

  cartItem = computed(() => this._cartService.getCartItemById(this._id() ?? ''));
  isStockLimitReached = computed(() => this._cartService.isStockLimitReached(this._id()?? ''));

  // State Management with Signals
  quantity = signal(1);
  selectedImageIndex = signal(0);
  
  goBack(){
    this._location.back();
  }

    addToCart(){
      const cartProduct: CartProductVm = {
        id: this._productDetails()?.id || '',
        name: this._productDetails()?.name || '',
        price: this._productDetails()?.price || 0,
        quantity: this._cartService.getCartItemById(this._productDetails()?.id ?? '')?.quantity || 1,
        imageUrl: `${this.url}/${this._productDetails()?.thumbnail}`,
        stock: this._productDetails()?.stock || 0,
        // rowVersion:this.product()?.rowVersion || ''
      };
      const message = this._cartService.addToCart(cartProduct);
      this._matSnackBar.open(message,'Close',{duration:1000})
    }
  
    updateWishlistState()
    {
      const id = this._id();
      if(!id )
        return;
      this.checked.update(prev=> !prev);
      let message = "";
      if(this.checked()){
        message="Added to Wishlist Successfully !"
      }
      else{
        message="Removed from Wishlist Successfully !"

      }
    const subscribe =this._productService.updateWishlistStatus(id).subscribe({
    next: v=> this._matSnackBar.open(message,'Close',{duration:1000}),
    error: err=> this._matSnackBar.open(err,'Close',{duration:1000}),
    complete: ()=> subscribe.unsubscribe()
  })
    }

    copyProductUrl(){
      const url = document.location.href
      navigator.clipboard.writeText(url)
        .then(()=>this._matSnackBar.open("Link copied successfully !", 'Close',{
          duration: 1000
        }))
    }
}

