import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details-review-card',
  imports: [],
  templateUrl: './product-details-review-card.html',
  styleUrl: './product-details-review-card.scss',
})
export class ProductDetailsReviewCard {
    product = {
    name: 'Premium Glassware Set',
    seller: 'Artisan Crystal Co.',
    price: 129.99,
    description: 'A stunning set of hand-blown glass with a modern iridescent finish.',
    images: ['thumb.jpg', 'angle1.jpg', 'angle2.jpg', 'angle3.jpg'],
    stock: 5,
    reviews: [
      { user: 'Sarah L.', comment: 'Absolutely beautiful ', rating: 5 },
      { user: 'Mark T.', comment: 'High quality and fast shipping.', rating: 4 }
    ]
  };
}
