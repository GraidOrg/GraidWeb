import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "../config/emailjs.config";

@Component({
  selector: "app-contact",
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
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  formType: "demo" | "contact" = "contact";
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get form type from query params
    this.route.queryParams.subscribe((params) => {
      this.formType = params["type"] === "demo" ? "demo" : "contact";
      this.initializeForm();
    });
  }

  initializeForm() {
    if (this.formType === "demo") {
      this.contactForm = this.fb.group({
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        institution: ["", [Validators.required]],
        role: ["", [Validators.required]],
        preferredDate: [""],
        preferredTime: [""],
        message: [""],
      });
    } else {
      this.contactForm = this.fb.group({
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        subject: ["", [Validators.required]],
        message: ["", [Validators.required]],
      });
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;
    this.submitSuccess = false;

    const formData = this.contactForm.value;
    const emailParams = {
      to_email: "ceo@graid.org",
      form_type: this.formType === "demo" ? "Schedule a Demo" : "Contact Us",
      from_name: formData.name,
      from_email: formData.email,
      subject:
        this.formType === "demo"
          ? `Demo Request from ${formData.name}`
          : formData.subject,
      message: this.formatMessage(formData),
    };

    // EmailJS configuration
    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        emailParams,
        emailjsConfig.publicKey
      )
      .then(
        () => {
          this.submitSuccess = true;
          this.isSubmitting = false;
          this.contactForm.reset();
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          this.submitError = true;
          this.isSubmitting = false;
        }
      );
  }

  formatMessage(data: any): string {
    if (this.formType === "demo") {
      return `
Demo Request Details:
- Name: ${data.name}
- Email: ${data.email}
- Institution: ${data.institution}
- Role: ${data.role}
- Preferred Date: ${data.preferredDate || "Not specified"}
- Preferred Time: ${data.preferredTime || "Not specified"}
- Additional Message: ${data.message || "None"}
      `.trim();
    } else {
      return data.message;
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError("required")) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field?.hasError("email")) {
      return "Please enter a valid email address";
    }
    return "";
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: "Name",
      email: "Email",
      institution: "Institution/Organization",
      role: "Role",
      preferredDate: "Preferred Date",
      preferredTime: "Preferred Time",
      subject: "Subject",
      message: "Message",
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}

