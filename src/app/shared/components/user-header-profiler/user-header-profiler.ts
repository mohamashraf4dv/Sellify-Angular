import { Component, inject, input } from '@angular/core';
import { UserJwt } from '../../../view-models/user-jwt/user-jwt';
import { TitleCasePipe } from '@angular/common';
import { take, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { GenerateImageOfFirstCharTwoWords } from "../generate-image-of-first-char-two-words/generate-image-of-first-char-two-words/generate-image-of-first-char-two-words";
import { AuthService } from '../../../core/auth/auth-service';

@Component({
  selector: 'app-user-header-profiler',
  imports: [RouterLink, TitleCasePipe, GenerateImageOfFirstCharTwoWords],
  templateUrl: './user-header-profiler.html',
  styleUrl: './user-header-profiler.scss',
})
export class UserHeaderProfiler {
 _authService = inject(AuthService)

  userData = input<UserJwt|null|undefined>();
  // userImage = computed(()=> this.mapNameForImage(this.userData()?.name));


  signOut(){
    
    return this._authService.revokeToken().pipe(take(1)).subscribe()
  }

}
