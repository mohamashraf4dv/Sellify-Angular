import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { ReviewForm } from "../../components/review-form/review-form";
import { SellerInfo } from '../../components/seller-info/seller-info';
import { ProductDetailsReviewCard } from '../../components/product-details-review-card/product-details-review-card';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, ReviewForm,SellerInfo,ProductDetailsReviewCard],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {

  _location = inject(Location)
  // Route param (using withComponentInputBinding)
  id = input.required<string>();
  
  // State Management with Signals
  quantity = signal(1);
  selectedImageIndex = signal(0);
  isAdding = signal(false);

  // Mock Data (Replace with your Product Service)
  product = {
    name: 'Premium Glassware Set',
    seller: 'Artisan Crystal Co.',
    price: 129.99,
    description: 'A stunning set of hand-blown glass with a modern iridescent finish.',
    images: ['thumb.jpg', 'angle1.jpg', 'angle2.jpg', 'angle3.jpg'],
    stock: 5,
    reviews: [
      { user: 'Sarah L.', comment: 'Absolutely beautiful design!', rating: 5 },
      { user: 'Mark T.', comment: 'High quality and fast shipping.', rating: 4 }
    ]
  };

  updateQuantity(val: number) {
    if (this.quantity() + val >= 1 && this.quantity() + val <= this.product.stock) {
      this.quantity.update(q => q + val);
    }
  }

  addToCart() {
    this.isAdding.set(true);
    // Simulate API call
    setTimeout(() => this.isAdding.set(false), 1500);
  }
  goBack(){
    this._location.back();
  }
}
