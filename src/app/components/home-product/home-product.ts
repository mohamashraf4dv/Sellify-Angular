import { Component, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { A11yModule } from "@angular/cdk/a11y";
import { MatDivider } from '@angular/material/divider';
import {MatProgressBar} from '@angular/material/progress-bar';
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { RouterLink } from '@angular/router';
import { SellerInfo } from '../seller-info/seller-info';
import { Product } from '../../view-models/product/product';
@Component({
  selector: 'app-home-product',
  imports: [MatCardModule, MatButtonModule, MatIcon, A11yModule, MatDivider, MatProgressBar,RouterLink,SellerInfo],
  templateUrl: './home-product.html',
  styleUrl: './home-product.scss',
})
export class HomeProduct {
  stockCount: number = 9;
  totalInitialStock: number = 100;
  checked: boolean = false;

}
