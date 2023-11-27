import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

export interface ResultDashboard {
  result: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private BASE_ROUTE = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  dashboard() {
    return firstValueFrom(this.http.get<ResultDashboard>(`${this.BASE_ROUTE}/dashboard`));
  }
}
