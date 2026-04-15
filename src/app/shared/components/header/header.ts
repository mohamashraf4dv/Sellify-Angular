import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Location } from '@angular/common';
import { AuthService } from '../../../core/auth/auth-service';
import { CartService } from '../../../core/cart/cart-service';
import { UserJwt } from '../../../view-models/user-jwt/user-jwt';
import { UserHeaderProfiler } from '../user-header-profiler/user-header-profiler';
import { UserHeaderNotification } from '../user-header-notification/user-header-notification';

// Add these to your @Component 'imports' array (if standalone)
// or your @NgModule 'imports' array.
@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatButtonModule,
    UserHeaderProfiler,
    RouterLink,
    UserHeaderNotification,
],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
  export class Header {

  private _location = inject(Location);
  private _router = inject(Router);
  private _authService = inject(AuthService)
  private _cartService = inject(CartService);

  protected userSignal = computed<UserJwt|null|undefined>(()=> this._authService.userSignal());
  private _isProductPage = signal<boolean>(false);
  protected IsProductPage = computed<boolean>(() => this._isProductPage()); 
  protected cartItemsCount = computed(() => this._cartService.cartItemsCount());


  private updateStatus() {
    this._isProductPage.set(this._router.url.includes('products'));
  }



}
