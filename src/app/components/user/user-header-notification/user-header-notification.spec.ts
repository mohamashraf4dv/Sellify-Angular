import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderNotification } from './user-header-notification';

describe('UserHeaderNotification', () => {
  let component: UserHeaderNotification;
  let fixture: ComponentFixture<UserHeaderNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHeaderNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHeaderNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
