import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { ContactService } from '../shared/services/contact.service';
import { EmailParams } from '../shared/interfaces/contact.interface';

interface ContactModel {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot (must stay empty)
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  submitting = false;
  sent = false;
  errorMsg = '';

  model: ContactModel = {
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  };

  constructor(private readonly contact: ContactService) {}

  onSubmit(): void {
    if (this.submitting) {
      return;
    }
    if (this.model.company) {
      this.sent = true; // honeypot
      return;
    }
    if (
      !this.model.name ||
      !this.model.email ||
      !this.model.subject ||
      !this.model.message
    ) {
      this.errorMsg = 'Please fill in your name, email, subject, and message.';
      return;
    }

    this.errorMsg = '';
    this.submitting = true;

    const params: EmailParams = {
      to_email: environment.contactEmail,
      form_type: 'contact',
      from_name: this.model.name,
      from_email: this.model.email,
      subject: this.model.subject,
      message: this.model.message,
    };

    this.contact.sendEmail(params).subscribe({
      next: () => {
        this.sent = true;
        this.submitting = false;
      },
      error: () => {
        this.submitting = false;
        this.errorMsg =
          'Something went wrong sending your message. Please email ceo@graid.org directly.';
      },
    });
  }
}
