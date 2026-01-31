import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../state/auth/auth.store';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  authStore = inject(AuthStore);
  private platformId = inject(PLATFORM_ID);
  
  constructor() {
    this.applyAllSettings();
  }
  
  // UI Settings (stored in localStorage for persistence)
  darkMode = this.getLocalStorage('darkMode') === 'true';
  compactView = this.getLocalStorage('compactView') === 'true';
  animations = this.getLocalStorage('animations') !== 'false'; // default true
  notifications = this.getLocalStorage('notifications') !== 'false';
  
  // Theme & Language
  selectedTheme = this.getLocalStorage('theme') || 'blue';
  selectedLanguage = this.getLocalStorage('language') || 'en';

  private getLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
  
  themes = [
    { value: 'blue', label: 'Blue Ocean', color: '#1976d2' },
    { value: 'purple', label: 'Purple Dream', color: '#7b1fa2' },
    { value: 'green', label: 'Forest Green', color: '#388e3c' },
    { value: 'orange', label: 'Sunset Orange', color: '#f57c00' },
    { value: 'pink', label: 'Pink Blossom', color: '#c2185b' }
  ];
  
  languages = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'he', label: 'עברית', flag: '🇮🇱' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  onDarkModeChange(enabled: boolean) {
    this.darkMode = enabled;
    this.setLocalStorage('darkMode', enabled.toString());
    this.applyDarkMode(enabled);
  }

  onCompactViewChange(enabled: boolean) {
    this.compactView = enabled;
    this.setLocalStorage('compactView', enabled.toString());
    this.applyCompactMode(enabled);
  }

  onAnimationsChange(enabled: boolean) {
    this.animations = enabled;
    this.setLocalStorage('animations', enabled.toString());
    this.applyAnimations(enabled);
  }

  onNotificationsChange(enabled: boolean) {
    this.notifications = enabled;
    this.setLocalStorage('notifications', enabled.toString());
  }

  onThemeChange(theme: string) {
    this.selectedTheme = theme;
    this.setLocalStorage('theme', theme);
    this.applyTheme(theme);
  }

  onLanguageChange(language: string) {
    this.selectedLanguage = language;
    this.setLocalStorage('language', language);
  }

  // Apply theme methods
  private applyDarkMode(enabled: boolean) {
    if (enabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private applyCompactMode(enabled: boolean) {
    if (enabled) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
  }

  private applyAnimations(enabled: boolean) {
    if (enabled) {
      document.body.classList.remove('no-animations');
    } else {
      document.body.classList.add('no-animations');
    }
  }

  private applyTheme(theme: string) {
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

  private applyAllSettings() {
    this.applyDarkMode(this.darkMode);
    this.applyCompactMode(this.compactView);
    this.applyAnimations(this.animations);
    this.applyTheme(this.selectedTheme);
  }

  clearCache() {
    // כאן אפשר להוסיף לוגיקה לניקוי cache
    alert('Cache cleared successfully!');
  }

  exportData() {
    alert('Data export feature - Coming soon!');
  }

  resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.removeLocalStorage('darkMode');
      this.removeLocalStorage('compactView');
      this.removeLocalStorage('animations');
      this.removeLocalStorage('notifications');
      this.removeLocalStorage('theme');
      this.removeLocalStorage('language');
      
      this.darkMode = false;
      this.compactView = false;
      this.animations = true;
      this.notifications = true;
      this.selectedTheme = 'blue';
      this.selectedLanguage = 'en';
      
      this.applyAllSettings();
      alert('Settings reset successfully!');
    }
  }
}
