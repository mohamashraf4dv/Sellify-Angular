import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { GenerateImageOfFirstCharTwoWords } from "../generate-image-of-first-char-two-words/generate-image-of-first-char-two-words/generate-image-of-first-char-two-words";

@Component({
  selector: 'app-seller-info',
  imports: [TitleCasePipe, GenerateImageOfFirstCharTwoWords],
  templateUrl: './seller-info.html',
  styleUrl: './seller-info.scss',
})
export class SellerInfo {

  sellerInfo = input<{img:string,name:string|undefined,sold:number|undefined, productName:string|undefined}>()

}
