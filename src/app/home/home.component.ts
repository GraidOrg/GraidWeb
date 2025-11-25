import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly currentYear = new Date().getFullYear();
  readonly routes = APP_CONSTANTS.ROUTES;
  readonly queryParams = APP_CONSTANTS.QUERY_PARAMS;

  constructor(private readonly router: Router) {}

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
}

