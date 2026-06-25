import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly processSteps = [
    { icon: 'event', label: 'Schedule a Demo' },
    { icon: 'rocket_launch', label: 'Perform a Free Semester-Long Pilot' },
    { icon: 'groups', label: 'Empower All Instructors with AI' },
  ] as const;

  readonly testimonials = [
    { quote: "It's better than my actual teacher", attribution: '-Max' },
    { quote: 'Finally an AI that helps my students learn', attribution: '-Dr. Davies' },
    { quote: "It grades for you! I couldn't ask for more", attribution: '-Dr. Arroyo' },
  ] as const;

  readonly currentYear = new Date().getFullYear();
  readonly routes = APP_CONSTANTS.ROUTES;
  readonly queryParams = APP_CONSTANTS.QUERY_PARAMS;

  activeTestimonialIndex = 0;

  private autoCycleIntervalId?: ReturnType<typeof setInterval>;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.startAutoCycle();
  }

  ngOnDestroy(): void {
    this.stopAutoCycle();
  }

  nextTestimonial(): void {
    this.activeTestimonialIndex =
      (this.activeTestimonialIndex + 1) % this.testimonials.length;
    this.startAutoCycle();
  }

  prevTestimonial(): void {
    this.activeTestimonialIndex =
      (this.activeTestimonialIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.startAutoCycle();
  }

  goToTestimonial(index: number): void {
    this.activeTestimonialIndex = index;
    this.startAutoCycle();
  }

  navigateToScheduleDemo(): void {
    this.router.navigate([`/${this.routes.CONTACT}`], {
      queryParams: { type: this.queryParams.DEMO },
    });
  }

  navigateToContact(): void {
    this.router.navigate([`/${this.routes.CONTACT}`], {
      queryParams: { type: this.queryParams.CONTACT },
    });
  }

  private startAutoCycle(): void {
    this.stopAutoCycle();
    this.autoCycleIntervalId = setInterval(() => {
      this.activeTestimonialIndex =
        (this.activeTestimonialIndex + 1) % this.testimonials.length;
    }, 5000);
  }

  private stopAutoCycle(): void {
    if (this.autoCycleIntervalId !== undefined) {
      clearInterval(this.autoCycleIntervalId);
      this.autoCycleIntervalId = undefined;
    }
  }
}
