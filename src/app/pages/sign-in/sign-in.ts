import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth-service';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private _authService: AuthService = inject(AuthService);
  private _formBuilder :FormBuilder= inject(FormBuilder);

  IsSubmitting:WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal("");
  protected _signInFormGroup= this._formBuilder.group(
    {
      loginIdentifier: ['',[Validators.required]],
      password:['',[Validators.required]],
      persistence:[true,[Validators.pattern('(true|false)')]]
    }
  )


  onSubmit(event: Event) {
    this.IsSubmitting.set(true);
    if(!this._signInFormGroup.valid){
      this.errorMessage.set("Invalid Input")
      console.log(this._signInFormGroup);
    this.IsSubmitting.set(false);

      return;

    }
    event.preventDefault();
    this._authService.signInInternally(this._signInFormGroup.value.loginIdentifier??"",this._signInFormGroup.value.password??"",this._signInFormGroup.value.persistence??false).subscribe(
      {
        next: (resolve)=>{
          console.log(resolve)
          console.log(`token:${resolve.data.token}`)
          localStorage.setItem("bearer",resolve.data.token)
          console.log(document.cookie);
          this.IsSubmitting.set(false);
          this.errorMessage.set("");

        },
        error: (err)=> {
          this.errorMessage.set(err.error.errorsKeyValues?.Credentials[0])
          console.log(this.errorMessage())
          this.IsSubmitting.set(false);
        }
      }
    )
    console.log("Form submitted", event);
  }
  
  signInWithGoogle(){
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  }
}
