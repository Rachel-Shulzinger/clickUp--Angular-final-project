import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:3000/api';
  const apiReq = req.clone({
    url: `${baseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`
  });

  return next(apiReq);
};