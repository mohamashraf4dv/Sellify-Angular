import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIcon, MatDatepickerModule, ReactiveFormsModule,MatNativeDateModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private _fb= inject(FormBuilder);
  
  IsSubmitting: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 18)); // 18 years ago
  minDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 100)); // 100 years ago
  protected registerForm = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required,Validators.minLength(6)]],
    dob: [null, Validators.required], // Date of Birth in MM/DD/YYYY format
  });
  onSubmit(event: Event) {
    this.IsSubmitting = true;
    event.preventDefault();
    console.log("Form submitted", event);
    console.log(this.registerForm.value)
  }

}
