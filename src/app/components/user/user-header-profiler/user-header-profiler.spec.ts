import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderProfiler } from './user-header-profiler';

describe('UserHeaderProfiler', () => {
  let component: UserHeaderProfiler;
  let fixture: ComponentFixture<UserHeaderProfiler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHeaderProfiler],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHeaderProfiler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
