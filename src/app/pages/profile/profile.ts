import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile 
{
  private _authService = inject(AuthService)
    protected result = toSignal(this._authService.test());


}
