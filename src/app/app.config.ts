import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { refreshTokenHandlerInterceptor } from './core/auth/interceptor/refresh-token-handler-interceptor';
import { bearerAdderInterceptor } from './core/auth/interceptor/bearer-adder-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
     provideRouter(routes),
     provideHttpClient(
      withFetch(),
      withInterceptors([refreshTokenHandlerInterceptor,bearerAdderInterceptor])),
      providePrimeNG({
        theme: {preset: Material}
      }),
    ],
      
};
