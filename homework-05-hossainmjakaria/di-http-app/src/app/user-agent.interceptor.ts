import { HttpInterceptorFn } from '@angular/common/http';

export const userAgentInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneReq = req.clone({
    headers: req.headers.set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1')
  });

  return next(cloneReq);
};
