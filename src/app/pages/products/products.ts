import { Component, computed, effect, inject } from '@angular/core';
import { HomeProduct } from '../../components/home-product/home-product';
import { ProductService } from '../../services/product/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AllProducts } from '../../view-models/get-all-products/get-all-products';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [HomeProduct],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  _productService = inject(ProductService);
 productsResponse= toSignal(this._productService.getProducts());
 products = computed(() => this.productsResponse()?.data.products || [] as AllProducts[]);
//  click$ = new Subject<string>()

//  clickEffect = effect(()=>{
//     this.click$.pipe(switchMap(productId => this._productService.updateWishlistStatus(productId))).subscribe({
//     next: v=> console.log(v),
//     error: err=> console.log(err),
//     complete: ()=> console.log("completed")
//   })
//  })

//  updateProductWishlistStatus(){
//   this.click$.pipe(switchMap(productId => this._productService.updateWishlistStatus(productId))).subscribe({
//     next: v=> console.log(v),
//     error: err=> console.log(err),
//     complete: ()=> console.log("completed")
//   })
//  }
}
