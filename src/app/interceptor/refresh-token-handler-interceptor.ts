import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { catchError, retry, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';

export const refreshTokenHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

return next(req).pipe(
  retry({ count: 2, delay: 2000 }), 
  catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      return authService.refreshToken().pipe(
        tap(value => {
          authService.userAccessToken.set(value.token);
          localStorage.setItem("auth", value.token);
          console.log("INNNN")
        })
        , switchMap(()=>next(req)
        )
    ) 
  }
     return throwError(()=> error)
  }
  
));
        
      
    
}