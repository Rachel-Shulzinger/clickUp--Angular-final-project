import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../state/auth/auth.store';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const token = authStore.token();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(

    //טיפול בשגיאות של אישור והרשאה
    catchError((error) => {
      if (error.status === 401) {
        authStore.clearAuth();
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        console.error('Access denied');
      }

      return throwError(() => error);
    })

  );
};
