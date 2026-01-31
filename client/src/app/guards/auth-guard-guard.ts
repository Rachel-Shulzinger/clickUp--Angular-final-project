import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../state/auth/auth.store';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  
  if (authStore.isAuthenticated()) {
    return true;
  }
  
  // Store the attempted URL for redirecting after login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
