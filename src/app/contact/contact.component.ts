import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ContactService } from '../shared/services/contact.service';
import {
  FormType,
  DemoFormData,
  ContactFormDataWithSubject,
} from '../shared/interfaces/contact.interface';
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  formType: FormType = APP_CONSTANTS.FORM_TYPES.CONTACT;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  private readonly destroy$ = new Subject<void>();
  private readonly contactEmail = environment.contactEmail;
  readonly constants = APP_CONSTANTS;
  readonly environment = environment;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly contactService: ContactService
  ) {}

  ngOnInit(): void {
    // Get form type from query params
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.formType =
          params['type'] === this.constants.QUERY_PARAMS.DEMO
            ? this.constants.FORM_TYPES.DEMO
            : this.constants.FORM_TYPES.CONTACT;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    if (this.formType === this.constants.FORM_TYPES.DEMO) {
      this.contactForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        institution: ['', [Validators.required]],
        role: ['', [Validators.required]],
        preferredDate: [''],
        preferredTime: [''],
        message: [''],
      });
    } else {
      this.contactForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', [Validators.required]],
        message: ['', [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;
    this.submitSuccess = false;
    this.errorMessage = '';

    const formData = this.contactForm.value;
    const emailParams = {
      to_email: this.contactEmail,
      form_type:
        this.formType === this.constants.FORM_TYPES.DEMO
          ? 'Schedule a Demo'
          : 'Contact Us',
      from_name: formData.name,
      from_email: formData.email,
      subject:
        this.formType === this.constants.FORM_TYPES.DEMO
          ? `Demo Request from ${formData.name}`
          : formData.subject,
      message: this.formatMessage(formData),
    };

    this.contactService.sendEmail(emailParams).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.contactForm.reset();
        setTimeout(() => {
          this.submitSuccess = false;
        }, this.constants.TIMEOUTS.SUCCESS_MESSAGE_DISPLAY);
      },
      error: (error: Error) => {
        console.error('Contact form submission error:', error);
        this.submitError = true;
        this.isSubmitting = false;
        this.errorMessage = error.message || 'An unknown error occurred';
        // Log detailed error for debugging
        if (!environment.production) {
          console.error('Email params that failed:', emailParams);
          console.error('Check your EmailJS configuration in environment.ts');
        }
      },
    });
  }

  formatMessage(
    data: DemoFormData | ContactFormDataWithSubject
  ): string {
    if (this.formType === this.constants.FORM_TYPES.DEMO) {
      const demoData = data as DemoFormData;
      return `
Demo Request Details:
- Name: ${demoData.name}
- Email: ${demoData.email}
- Institution: ${demoData.institution}
- Role: ${demoData.role}
- Preferred Date: ${demoData.preferredDate || 'Not specified'}
- Preferred Time: ${demoData.preferredTime || 'Not specified'}
- Additional Message: ${demoData.message || 'None'}
      `.trim();
    } else {
      const contactData = data as ContactFormDataWithSubject;
      return contactData.message || '';
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required')) {
      return this.constants.MESSAGES.REQUIRED_FIELD;
    }
    if (field?.hasError('email')) {
      return this.constants.MESSAGES.INVALID_EMAIL;
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
      institution: 'Institution/Organization',
      role: 'Role',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      subject: 'Subject',
      message: 'Message',
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  get formTitle(): string {
    return this.formType === this.constants.FORM_TYPES.DEMO
      ? 'Schedule a Demo'
      : 'Contact Us';
  }

  get formSubtitle(): string {
    return this.formType === this.constants.FORM_TYPES.DEMO
      ? "Fill out the form below and we'll get back to you soon."
      : "We'd love to hear from you. Send us a message and we'll respond as soon as possible.";
  }
}

