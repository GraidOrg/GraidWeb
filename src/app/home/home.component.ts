import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly processSteps = [
    { icon: 'event', label: 'Get Free\nSemester-Long Pilot' },
    { icon: 'rocket_launch', label: 'See Improved\nStudent Success' },
    { icon: 'groups', label: 'Empower All Instructors with AI' },
  ] as const;

  readonly testimonials = [
    { quote: 'its better than my actual teacher', attribution: '-Max' },
    { quote: 'I can see the student conversations! Love the visibility', attribution: '-Dr. Davies' },
    { quote: "It grades for you, I couldn't ask for more.", attribution: '-Dr. Arroyo' },
  ] as const;

  readonly currentYear = new Date().getFullYear();
  readonly routes = APP_CONSTANTS.ROUTES;
  readonly queryParams = APP_CONSTANTS.QUERY_PARAMS;

  activeTestimonialIndex = 0;
  isVideoPlaying = false;

  @ViewChild('tutoringVideo') tutoringVideo?: ElementRef<HTMLVideoElement>;

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

  playVideo(): void {
    void this.tutoringVideo?.nativeElement.play();
  }

  onVideoPlay(): void {
    this.isVideoPlaying = true;
  }

  onVideoPause(): void {
    this.isVideoPlaying = false;
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
