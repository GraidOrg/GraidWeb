import { bootstrapApplication } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ErrorHandlerService } from './app/shared/services/error-handler.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
}).catch((err) => console.error('Error bootstrapping application:', err));

