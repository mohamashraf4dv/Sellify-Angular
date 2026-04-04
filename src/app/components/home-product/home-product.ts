import { Component, computed, input } from '@angular/core';
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
@Component({
  selector: 'app-home-product',
  imports: [MatCardModule, MatButtonModule, MatIcon, A11yModule, MatDivider, MatProgressBar,RouterLink,SellerInfo,TitleCasePipe],
  templateUrl: './home-product.html',
  styleUrl: './home-product.scss',
})
export class HomeProduct {
  lowStockCount: number = 5; // You can adjust this as needed --> it will reflect the low stock status when the stock is below this number
  totalInitialStock: number = 100; // You can set this to the initial stock value for the product, it will be used to calculate the percentage for the progress bar
  checked: boolean = false;

  url = environment.fileDomainUrl;
  product = input<AllProducts>();

  sellerInfo = computed(()=>{
    return {
      img: `${this.url}/${this.product()?.sellerImage}`,
      name: this.product()?.sellerFullName ,
      sold: this.product()?.totalSold ,
      productName: this.product()?.productName
    }
  });
  test(){
    console.log(this.product());
  }
}
