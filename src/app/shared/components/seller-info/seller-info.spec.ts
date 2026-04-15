import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInfo } from './seller-info';

describe('SellerInfo', () => {
  let component: SellerInfo;
  let fixture: ComponentFixture<SellerInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
