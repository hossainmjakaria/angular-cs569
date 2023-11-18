import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.medicationSignal().jwt;

  if (token) {
    const clonedReq = req.clone({
      setHeaders: { 'Authorization': 'Bearer ' + token }
    });
    return next(clonedReq);
  }

  return next(req);
};
