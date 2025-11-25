import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { APP_CONSTANTS } from './shared/constants/app.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly title = 'Graid';
  readonly routes = APP_CONSTANTS.ROUTES;

  constructor(private readonly router: Router) {}

  navigateToScheduleDemo(): void {
    this.router.navigate([`/${this.routes.CONTACT}`], {
      queryParams: { type: APP_CONSTANTS.QUERY_PARAMS.DEMO },
    });
  }

  navigateToHome(): void {
    this.router.navigate([`/${this.routes.HOME}`]);
  }
}
