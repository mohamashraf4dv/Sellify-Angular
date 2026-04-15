import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerAddProductProductView } from '../seller-add-product-product-view/seller-add-product-product-view';
import {form, FormField, min, required} from '@angular/forms/signals';
import { SellerService } from '../service/seller-service';
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,CommonModule, FormField ,SellerAddProductProductView],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  private readonly _sellerService = inject(SellerService);
  private _fb = inject(FormBuilder);
  productFormSignal = signal({
    name: '',
    description: '',
    price: 0,
    imageURL: '',
    image: null as File | null
  });
  productForm = form(this.productFormSignal,(schemePath)=>{
    required(schemePath.name);
    required(schemePath.price);
    required(schemePath.description);
    required(schemePath.price);
    min(schemePath.price,0.01);
    required(schemePath.image);
  })
  // productForm = this._fb.group({
  //     name: ['', [Validators.required, Validators.minLength(3)]],
  //     description: ['', [Validators.required, Validators.maxLength(500)]],
  //     price: [0, [Validators.required, Validators.min(0.01)]],
  //     imageURL: ['', [Validators.required,]]
  //   });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.productForm().valid()) {
      const formValue = this.productFormSignal();
      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('description', formValue.description);
      formData.append('price', formValue.price.toString());
      formData.append('image', formValue.image as Blob);
      console.log(formData);

      // console.log(formValue)
      this._sellerService.addNewProduct(formData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          // Optionally reset the form or provide user feedback here
        },
        error: (error) => {
          console.error('Error adding product:', error);
          // Optionally provide user feedback about the error here
        }
      });
    }

    }
    test(){
      console.log(this.productFormSignal())
      console.log(this.productForm())
    }

    onImageUpload(event:any){
      const file = event.target.files[0];
      console.log(file)
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.productFormSignal.update(prev => ({...prev,imageURL: e.target.result, image: file}))
        reader.readAsDataURL(file);
        reader.readAsText
        console.log(event.target.files)
      // this.profileImage.
    }
  }
  }
