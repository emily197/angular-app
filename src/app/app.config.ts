import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/interceptors/Token.interceptor';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),
    provideAnimations(),
  ]
};
