import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile 
{
  private _authService = inject(AuthService)
    protected result = computed(()=>this._authService.userSignal());

    protected data= computed(()=> this._authService.userAccessToken());

}
