import { Component, computed, effect, EventEmitter, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { ReviewService } from '../../services/review/review-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule, FormField],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss',
})
export class ReviewForm {
  private readonly _reviewService = inject(ReviewService);
  private readonly _matSnackBar= inject(MatSnackBar)
  productId = input<string|null>(null);
  
  productIdEffect = effect(()=>{
  const data = this.productId()
  if( data)
    this.reviewModel.update(prev=> ({...prev,productId:data}))
  })
  rating = signal(0);
  hoverRating = signal(0);

  // comment = signal(this.reviewForm.get("comment")?.value);
  
// Inside your component class
readonly isAnonymous = signal(false);

reviewModel = signal<reviewForm>({
  description:"",
  isReviewedAnonymously:false,
  productId:"",
  score:0
})
reviewForm = form(this.reviewModel)
setIdentity(anonymous: boolean) {
  this.isAnonymous.set(anonymous);
  this.reviewModel.update(prev=> ({...prev,isReviewedAnonymously:anonymous}))

}

  isOverLimit = () =>  (this.reviewModel().description?.length || 0 ) > 500 ;
  charCount = () => this.reviewModel().description?.length|| 0;

  setRating(val: number) {
    this.rating.set(val);
    this.reviewModel.update(prev=> ({...prev,score:val}))
  }

  submitReview(event:Event) {
    event.preventDefault();
    // if (this.rating() === 0) return alert('Please select a rating');
    // Reset form logic here
    console.log(this.reviewForm().value());
    
    this._reviewService.addNewReview(this.reviewForm().value()).subscribe({
      next:(res=>{
        this._matSnackBar.open("Added new review!", "Close",{duration:1000})
        console.log(res)
      }),
      error: err=> this._matSnackBar.open("Something wrong Happened!", "Close",{duration:1000})

    });
    
  }
}

interface reviewForm {
  score: number;
  description: string;
  productId:string;
  isReviewedAnonymously:boolean
}
