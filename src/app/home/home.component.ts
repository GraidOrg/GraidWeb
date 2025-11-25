import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  navigateToScheduleDemo() {
    this.router.navigate(['/contact'], { queryParams: { type: 'demo' } });
  }

  navigateToContact() {
    this.router.navigate(['/contact'], { queryParams: { type: 'contact' } });
  }
}

