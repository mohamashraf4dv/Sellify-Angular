import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  IsSubmitting: boolean = false;

  onSubmit(event: Event) {
    this.IsSubmitting = true;
    event.preventDefault();
    console.log("Form submitted", event);
  }
  signInWithGoogle(){
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  }
}
