import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth/auth-service';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller/seller-service';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-profile',
  imports: [MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatSlideToggleModule, MatIcon, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile
{

  private readonly _formBuilder = inject(FormBuilder)
  private _authService = inject(AuthService)
  private _sellerService = inject(SellerService)
  protected userData = toSignal(this._authService.getCurrentUser())
  protected sellerStatus = computed(()=> this.userData()?.data.sellerRoleRequestStatus)
  // protected isSeller = signal(this.userData()?.data.roles.includes("seller"));

  profileForm = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    userName: [''],
    phoneNumber: ['']
  })
  protected profileImage = signal('');

    updateProfile(){
      console.log(this.profileForm.value);
      this._authService.UpdateCurrentUser(this.profileForm.value).subscribe({next: (v)=> console.log(v)});
    }
/**
 *
 */
constructor() {
    effect(() => {
    const data = this.userData();
    if (data) {
      this.profileForm.patchValue({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        userName: data.data.userName,
        phoneNumber: data.data.phoneNumber
      });
      this.profileImage.set(data.data.picture)

    }
      console.log(this.userData());

  });
}

    applyAsSeller(){
    this._sellerService.requestToBeSeller().subscribe(v=> console.log(v));
    }
    onImageUpload(event:any){
      const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.profileImage.set(e.target.result);
      reader.readAsDataURL(file);
      reader.readAsText
      console.log(event.target.files)
      // this.profileImage.
    }
  }

  testBtn(){
    console.log(this.sellerStatus())
  }
    
}
