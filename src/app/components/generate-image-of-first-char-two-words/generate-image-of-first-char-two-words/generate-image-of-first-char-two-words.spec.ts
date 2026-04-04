import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateImageOfFirstCharTwoWords } from './generate-image-of-first-char-two-words';

describe('GenerateImageOfFirstCharTwoWords', () => {
  let component: GenerateImageOfFirstCharTwoWords;
  let fixture: ComponentFixture<GenerateImageOfFirstCharTwoWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateImageOfFirstCharTwoWords],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateImageOfFirstCharTwoWords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
