import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { EmailParams } from '../interfaces/contact.interface';

/**
 * Service for handling contact form submissions via EmailJS
 */
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly emailjsConfig = environment.emailjs;

  constructor() {
    // Note: emailjs.init() is not required for @emailjs/browser v4+
    // The public key is passed directly to emailjs.send()
  }

  /**
   * Sends an email using EmailJS
   * @param params Email parameters
   * @returns Observable that emits when email is sent successfully
   */
  sendEmail(params: EmailParams): Observable<void> {
    // Validate configuration
    if (!this.emailjsConfig.serviceId || !this.emailjsConfig.templateId || !this.emailjsConfig.publicKey) {
      console.error('EmailJS configuration is missing:', this.emailjsConfig);
      return throwError(() => new Error('EmailJS configuration is incomplete. Please check your environment settings.'));
    }

    // Log parameters for debugging (remove sensitive data in production)
    if (!environment.production) {
      console.log('Sending email with params:', {
        serviceId: this.emailjsConfig.serviceId,
        templateId: this.emailjsConfig.templateId,
        params: { ...params, message: params.message.substring(0, 50) + '...' },
      });
    }

    return from(
      emailjs.send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        params as Record<string, unknown>,
        this.emailjsConfig.publicKey
      )
    ).pipe(
      map(() => undefined),
      catchError((error: EmailJSResponseStatus) => {
        console.error('EmailJS Error:', {
          status: error.status,
          text: error.text,
        });
        
        // Provide more helpful error messages
        let errorMessage = 'Failed to send email. ';
        if (error.status === 400) {
          errorMessage += 'Bad Request - Please check your EmailJS template variables match the parameters being sent.';
        } else if (error.status === 401) {
          errorMessage += 'Unauthorized - Please check your EmailJS Public Key.';
        } else if (error.status === 404) {
          errorMessage += 'Not Found - Please check your Service ID and Template ID.';
        } else {
          errorMessage += `Error: ${error.text || 'Unknown error'}`;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

