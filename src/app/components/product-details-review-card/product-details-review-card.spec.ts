import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsReviewCard } from './product-details-review-card';

describe('ProductDetailsReviewCard', () => {
  let component: ProductDetailsReviewCard;
  let fixture: ComponentFixture<ProductDetailsReviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsReviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsReviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
