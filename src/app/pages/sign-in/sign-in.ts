import { Component, computed, effect, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth-service';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn implements OnDestroy{

  private router= inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder :FormBuilder= inject(FormBuilder);
  private _signInSubscriber!:Subscription;
  protected IsSubmitting:WritableSignal<boolean> = signal(false);
  protected errorMessage: WritableSignal<string> = signal("");
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
    this._signInSubscriber =this._authService.signInInternally(this._signInFormGroup.value.loginIdentifier??"",this._signInFormGroup.value.password??"",this._signInFormGroup.value.persistence??false).subscribe(
      {
        next: (resolve)=>{
          this._authService.userData.set(resolve.data)
          localStorage.setItem("auth",resolve.data);
          this._authService.userAccessToken.set(resolve.data);
          this.IsSubmitting.set(false);
          this.errorMessage.set("");
          this.router.navigate([''])
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
  ngOnDestroy(): void {
    this._signInSubscriber?.unsubscribe();
  }
}
