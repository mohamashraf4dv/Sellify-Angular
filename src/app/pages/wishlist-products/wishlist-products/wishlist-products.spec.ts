import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistProducts } from './wishlist-products';

describe('WishlistProducts', () => {
  let component: WishlistProducts;
  let fixture: ComponentFixture<WishlistProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
