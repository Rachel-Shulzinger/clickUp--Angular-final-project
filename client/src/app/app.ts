import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Login } from './components/login/login';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ClickUp');
  protected sidenavOpened = signal(true);
  private platformId = inject(PLATFORM_ID);

  constructor(public router: Router) {
    this.loadUserSettings();
  }

  private loadUserSettings() {
    // Only run in browser (not during SSR)
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Apply saved settings on app load
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const compactView = localStorage.getItem('compactView') === 'true';
    const animations = localStorage.getItem('animations') !== 'false';
    const theme = localStorage.getItem('theme') || 'blue';

    if (darkMode) {
      document.body.classList.add('dark-mode');
    }
    if (compactView) {
      document.body.classList.add('compact-mode');
    }
    if (!animations) {
      document.body.classList.add('no-animations');
    }

    // Apply theme colors
    const themeColors: Record<string, { primary: string; light: string; dark: string }> = {
      blue: { primary: '#1976d2', light: '#64b5f6', dark: '#0d47a1' },
      purple: { primary: '#7b1fa2', light: '#ba68c8', dark: '#4a148c' },
      green: { primary: '#388e3c', light: '#81c784', dark: '#1b5e20' },
      orange: { primary: '#f57c00', light: '#ffb74d', dark: '#e65100' },
      pink: { primary: '#c2185b', light: '#f48fb1', dark: '#880e4f' }
    };

    const colors = themeColors[theme];
    if (colors) {
      document.documentElement.style.setProperty('--primary-color', colors.primary);
      document.documentElement.style.setProperty('--primary-light', colors.light);
      document.documentElement.style.setProperty('--primary-dark', colors.dark);
    }
  }

  toggleSidenav() {
    this.sidenavOpened.set(!this.sidenavOpened());
  }

  isAuthPage(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/register');
  }

  isHomePage(): boolean {
    const url = this.router.url;
    return url === '/' || url === '';
  }

  navigateToSettings() {
    this.router.navigate(['/settings']).then(success => {
      // Navigation success
    }).catch(err => {
      // Navigation error
    });
  }
}
