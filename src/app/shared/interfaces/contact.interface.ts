/**
 * Contact form interfaces
 */
export type FormType = 'demo' | 'contact';

export interface ContactFormData {
  name: string;
  email: string;
  message?: string;
}

export interface DemoFormData extends ContactFormData {
  institution: string;
  role: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface ContactFormDataWithSubject extends ContactFormData {
  subject: string;
  message: string; // Required for contact forms
}

export interface EmailParams extends Record<string, unknown> {
  to_email: string;
  form_type: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

