import { Component, computed, EventEmitter, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss',
})
export class ReviewForm {
  _formBuilder = inject(FormBuilder);
  rating = signal(0);
  hoverRating = signal(0);
  // comment = signal(this.reviewForm.get("comment")?.value);
  
  // 2026 approach: Computed signal for character limit UX


   reviewForm= this._formBuilder.group({
    comment: ['',[Validators.maxLength(600),Validators.required]]
    })

  isOverLimit = () =>  (this.reviewForm.value?.comment?.length || 0 ) > 500 ;
  charCount = () => this.reviewForm.value?.comment?.length || 0;

  setRating(val: number) {
    this.rating.set(val);
  }

  submitReview(event:Event) {
    event.preventDefault();
    if (this.rating() === 0) return alert('Please select a rating');
    // Reset form logic here
    console.log(this.reviewForm.value.comment)
  }
}
