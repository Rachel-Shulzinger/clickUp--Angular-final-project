import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://clickup-angular-final-project-server-hecm.onrender.com/api';
  const apiReq = req.clone({
    url: `${baseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`
  });

  return next(apiReq);
};