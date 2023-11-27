import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

const routesWithAuth = [
  'dashboard'
]

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.requiresAuthentication(request.url)) {
      const authToken = this.authService.getAuthToken();
      if (authToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    }

    return next.handle(request);
  }

  private requiresAuthentication(url: string): boolean {
    for(const route of routesWithAuth) {
      if(url.includes(route)) {
        return true;
      }
    }

    return false;
  }
}
