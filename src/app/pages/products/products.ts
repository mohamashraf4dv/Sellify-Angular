import { Component } from '@angular/core';
import { HomeProduct } from '../../components/home-product/home-product';

@Component({
  selector: 'app-products',
  imports: [HomeProduct],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

}
