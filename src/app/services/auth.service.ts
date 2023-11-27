import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_ROUTE = 'http://localhost:3000';
  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  async login(): Promise<void> {
    const res = this.http.post<any>(`${this.BASE_ROUTE}/login`, {})
      .pipe(map(x => x.token));
    const token = await firstValueFrom(res);

    this.setAuthToken(token);
  }


  setAuthToken(token: string): void {
    this.removeAuthToken();
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }
}
