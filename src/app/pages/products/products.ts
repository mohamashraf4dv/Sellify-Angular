import { Component, computed, inject } from '@angular/core';
import { HomeProduct } from '../../components/home-product/home-product';
import { ProductService } from '../../services/product/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AllProducts } from '../../view-models/get-all-products/get-all-products';

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
}
