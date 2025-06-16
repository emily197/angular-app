import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MonthWork } from 'src/app/interfaces/month-work.interface.';
import { CommandService } from 'src/app/services/command.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-index-dashboard',
  imports: [DatePipe],
  templateUrl: './index-dashboard.component.html',
})
export class IndexDashboardComponent {
  currentDate = new Date();
  commandStatus: boolean = false;
  monthWork: MonthWork[] = [];


  command = '';
  commandResult = '';
  employeesCount = 8; // Ejemplo, cámbialo por tu dato real
  workers = ['Ana Torres', 'Luis Pérez', 'María López', 'Carlos Díaz', 'Sofía Gómez'];

  private commandService = inject(CommandService);
  private dashboardService = inject(DashboardService);







  getSummary(){
    this.dashboardService.getMonthWork()
      .subscribe({
        next: (resp) => {
          this.monthWork = resp.summary;
        },
        error: (err) => {
          console.log(err.error?.message || 'Tuvimos un problema ...');
        }
      });
  }

  runCommand() {
    this.commandService.postCommand()
      .subscribe({
        next: (resp) => {
          alert(resp.message || 'yeee');
          this.getStatusCommand();
        },
        error: (err) => {
          console.log(err.error?.message || 'Tuvimos un problema ...');
        }
      });
  }

  getStatusCommand(){
    this.commandService.getStatusCommand()
          .subscribe({
        next: (resp) => {
          this.commandStatus = resp.status;
        },
        error: (err) => {
          console.log(err.error?.message || 'Tuvimos un problema ...');
        }
      });
  }


  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.getStatusCommand();
    this.getSummary();




    // Aquí puedes inicializar la gráfica si usas Chart.js, etc.
  }

}
