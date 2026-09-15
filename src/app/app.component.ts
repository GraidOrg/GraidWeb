import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from './shared/components/site-header/site-header.component';
import { SiteFooterComponent } from './shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
