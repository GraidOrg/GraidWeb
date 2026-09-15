import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { ContactService } from '../shared/services/contact.service';
import { EmailParams } from '../shared/interfaces/contact.interface';

interface EarlyAccessModel {
  name: string;
  email: string;
  institution: string;
  role: string;
  lms: string;
  course: string;
  message: string;
  company: string; // honeypot (must stay empty)
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly currentYear = new Date().getFullYear();

  navOpen = false;
  submitting = false;
  sent = false;
  errorMsg = '';

  model: EarlyAccessModel = {
    name: '',
    email: '',
    institution: '',
    role: '',
    lms: 'Canvas',
    course: '',
    message: '',
    company: '',
  };

  @ViewChild('heroWave') heroWave?: ElementRef<HTMLCanvasElement>;

  private observer?: IntersectionObserver;
  private rafId?: number;
  private onResize?: () => void;
  private readonly reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly contact: ContactService
  ) {}

  ngOnInit(): void {
    // Apply a previously chosen theme (system preference otherwise).
    try {
      const saved = localStorage.getItem('graid-theme');
      if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch {
      /* localStorage unavailable; fall back to system preference */
    }
  }

  ngAfterViewInit(): void {
    this.setupReveal();
    this.setupWave();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.onResize) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  toggleTheme(): void {
    const root = document.documentElement;
    const isDark =
      root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('graid-theme', next);
    } catch {
      /* ignore persistence failure */
    }
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  onSubmit(): void {
    if (this.submitting) {
      return;
    }
    // Honeypot: silently "succeed" for bots.
    if (this.model.company) {
      this.sent = true;
      return;
    }
    if (!this.model.name || !this.model.email || !this.model.institution) {
      this.errorMsg = 'Please fill in your name, work email, and institution.';
      return;
    }

    this.errorMsg = '';
    this.submitting = true;

    const details = [
      `Institution: ${this.model.institution}`,
      `Role: ${this.model.role || 'Not specified'}`,
      `LMS: ${this.model.lms || 'Not specified'}`,
      `Teaches: ${this.model.course || 'Not specified'}`,
      '',
      this.model.message || '(no message)',
    ].join('\n');

    const params: EmailParams = {
      to_email: environment.contactEmail,
      form_type: 'early-access',
      from_name: this.model.name,
      from_email: this.model.email,
      subject: `Early access request from ${this.model.institution}`,
      message: details,
    };

    this.contact.sendEmail(params).subscribe({
      next: () => {
        this.sent = true;
        this.submitting = false;
      },
      error: () => {
        this.submitting = false;
        this.errorMsg =
          'Something went wrong sending your request. Please email ceo@graid.org and we’ll get you set up.';
      },
    });
  }

  private setupReveal(): void {
    const els = Array.from(
      this.el.nativeElement.querySelectorAll<HTMLElement>('.reveal')
    );
    if (this.reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((elm) => elm.classList.add('in'));
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((elm) => this.observer?.observe(elm));
  }

  private setupWave(): void {
    const canvas = this.heroWave?.nativeElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const size = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    this.onResize = size;
    window.addEventListener('resize', this.onResize);

    let t = 0;
    const line = (amp: number, speed: number, alpha: number, w: number): void => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) {
        const y =
          H / 2 +
          Math.sin(x * 0.012 + t * speed) * amp * Math.sin(x * 0.0015 + t * 0.4) +
          Math.sin(x * 0.03 - t * speed * 1.3) * (amp * 0.35);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(252,207,33,${alpha})`;
      ctx.lineWidth = w;
      ctx.stroke();
    };

    const frame = (): void => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      line(26, 0.9, 0.5, 2);
      line(18, 1.3, 0.28, 1.5);
      line(12, 0.6, 0.16, 1);
      t += 0.02;
      this.rafId = requestAnimationFrame(frame);
    };

    if (this.reduceMotion) {
      line(20, 0, 0.4, 2);
    } else {
      frame();
    }
  }
}
