import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardHeader } from './seller-dashboard-header';

describe('SellerDashboardHeader', () => {
  let component: SellerDashboardHeader;
  let fixture: ComponentFixture<SellerDashboardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDashboardHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerDashboardHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
