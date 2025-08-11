import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const token = localStorage.getItem('jwt');

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: token
  })

  const newReq = req.clone({headers});

  return next(newReq);
};
