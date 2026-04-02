import { Component, input } from '@angular/core';
import { SellerInfo } from '../../seller-info/seller-info';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Product } from '../../../view-models/product/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-seller-add-product-product-view',
  imports: [MatCardModule, MatButtonModule, MatIcon, A11yModule, MatDivider, MatProgressBar,CurrencyPipe,MatCard],
  templateUrl: './seller-add-product-product-view.html',
  styleUrl: './seller-add-product-product-view.scss',
})
export class SellerAddProductProductView {
  productProp = input<Product|null|undefined>();

convertFileToBase64(file: File|null|undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('https://via.placeholder.com/300x200?text=No+Image');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
}
