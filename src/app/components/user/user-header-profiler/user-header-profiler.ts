import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { UserJwt } from '../../../view-models/user-jwt/user-jwt';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../services/auth/auth-service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-user-header-profiler',
  imports: [TitleCasePipe],
  templateUrl: './user-header-profiler.html',
  styleUrl: './user-header-profiler.scss',
})
export class UserHeaderProfiler {
 _authService = inject(AuthService)

  userData = input<UserJwt|null|undefined>();
  userImage = computed(()=> this.mapNameForImage(this.userData()?.name));


  signOut(){
    
    return this._authService.revokeToken().pipe(take(1)).subscribe()
  }

  mapNameForImage(name:string|undefined):string{
    if(name == undefined)
      return "U K";
    const nameinArr= name.split(" ");
    const firstChar= nameinArr[0][0].toUpperCase();
    const secondChar= nameinArr[1][0].toUpperCase();
    return `${firstChar} ${secondChar}`;
  }

}
