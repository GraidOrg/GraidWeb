import { Injectable, ErrorHandler, inject } from '@angular/core';
import { environment } from '@environments/environment';

/**
 * Global error handler service
 * Logs errors and can be extended to send errors to monitoring services
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: Error): void {
    // In production, you might want to send this to a logging service
    if (!environment.production) {
      console.error('Error caught by ErrorHandler:', error);
    }
    
    // TODO: Integrate with error monitoring service (e.g., Sentry, LogRocket)
    // Example:
    // if (environment.production) {
    //   Sentry.captureException(error);
    // }
  }
}

