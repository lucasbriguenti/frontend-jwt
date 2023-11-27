import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  resultadoDashboard = '';

  constructor(private authService: AuthService, private dashboardService: DashboardService) {}

  logar() {
    this.authService.login();
  }

  async dashboard() {
    try {
      const resultado = await this.dashboardService.dashboard();
      this.resultadoDashboard = resultado.result;
    } catch (error) {
      this.resultadoDashboard = 'Não logado';
    }
  }
}
