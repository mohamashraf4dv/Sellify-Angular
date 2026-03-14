import { Component, input } from '@angular/core';

@Component({
  selector: 'app-seller-info',
  imports: [],
  templateUrl: './seller-info.html',
  styleUrl: './seller-info.scss',
})
export class SellerInfo {

  sellerInfo = input<{img:string,name:string,sold:number}>()

}
