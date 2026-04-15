import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddProductProductView } from './seller-add-product-product-view';

describe('SellerAddProductProductView', () => {
  let component: SellerAddProductProductView;
  let fixture: ComponentFixture<SellerAddProductProductView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddProductProductView],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerAddProductProductView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
