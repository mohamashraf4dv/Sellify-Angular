import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/auth/auth-service';
@Component({
  selector: 'app-user-orders',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss',
})
export class UserOrders {
  private readonly _authService =inject(AuthService)

  ordersResponses = toSignal(this._authService.getOrders());
  orders = computed(()=> this.ordersResponses()?.data);
  url = environment.fileDomainUrl;
}

