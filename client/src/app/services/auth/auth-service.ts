import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Cookies from 'js-cookie';
import { AuthResponse, User } from '../../models/user.model';
import { AuthStore } from '../../state/auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  async login(email: string, password: string): Promise<void> {
    this.authStore.setLoading(true);
    try {
      const response = await firstValueFrom(
        this.httpClient.post<AuthResponse>(`/auth/login`, {
          email,
          password
        })
      );
      Cookies.set('token', response.token, {
        expires: 14,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      this.authStore.setLoginSuccess(response);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'התחברות נכשלה';
      this.authStore.setLoginFailure(errorMessage);
    }
  }

  async register(userData: User): Promise<void> {
    this.authStore.setLoading(true);
    try {
      const response = await firstValueFrom(
        this.httpClient.post<AuthResponse>(`/auth/register`, userData)
      );
      Cookies.set('token', response.token, {
        expires: 14,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      this.authStore.setLoginSuccess(response);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'הרשמה נכשלה';
      this.authStore.setLoginFailure(errorMessage);
    }
  }

  logout(): void {
    Cookies.remove('token');
    this.authStore.logout();
    this.router.navigate(['/login']);
  }

  clearError(): void {
    this.authStore.clearError();
  }

  async loadUserFromToken(): Promise<void> {
    const token = Cookies.get('token');

    if (!token) {
      return;
    }

    this.authStore.setLoading(true);

    try {
      this.authStore.setLoading(false);

    } catch (error) {
      Cookies.remove('token');
      this.authStore.clearAuth();
    }
  }
}
