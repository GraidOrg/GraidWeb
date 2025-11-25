import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Graid";

  constructor(private router: Router) {}

  navigateToScheduleDemo() {
    this.router.navigate(['/contact'], { queryParams: { type: 'demo' } });
  }
}
