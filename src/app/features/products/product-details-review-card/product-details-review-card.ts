import { Component, input } from '@angular/core';
import { getProductByIdReviewsDTO } from '../../../view-models/product-details-vm/product-details-vm';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details-review-card',
  imports: [TitleCasePipe,],
  templateUrl: './product-details-review-card.html',
  styleUrl: './product-details-review-card.scss',
})
export class ProductDetailsReviewCard {
  review = input<getProductByIdReviewsDTO>()

}
