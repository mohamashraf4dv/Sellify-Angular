import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';

export const bearerAdderInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService)
  const token = _authService.userAccessToken()?? localStorage.getItem("auth");
  const reqCloned = req.clone({headers: req.headers.set("Authorization", `Bearer ${token}`)})
  console.log(token)
  return next(reqCloned);
};
