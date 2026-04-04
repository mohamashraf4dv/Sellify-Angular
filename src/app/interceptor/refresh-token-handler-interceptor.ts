import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { catchError, retry, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';

export const refreshTokenHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
return next(req).pipe(
  catchError((error: HttpErrorResponse) => {

    if (error.status === 401  ) {
        localStorage.removeItem("auth");
        authService.userData.set(null);
        authService.userAccessToken.set(null);
      return authService.refreshToken().pipe(
        tap(value => {
          authService.userAccessToken.set(value.token);
          authService.userData.set(value.token);
          localStorage.setItem("auth", value.token);


        }), switchMap(()=>{ 
          const reqClone = req.clone({setHeaders:{Authorization:`Bearer ${authService.userAccessToken()}`}})
          return next(reqClone);
        } )
    )
  }
     return throwError(()=> error)
  }
  
));
        
      
    
}