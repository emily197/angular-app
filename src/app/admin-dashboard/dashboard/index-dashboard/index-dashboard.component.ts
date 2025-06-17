import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MonthWork } from 'src/app/interfaces/month-work.interface.';
import { CommandService } from 'src/app/services/command.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject, takeUntil, catchError, of, finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-index-dashboard',
  imports: [DatePipe, NgxChartsModule],
  templateUrl: './index-dashboard.component.html',
})

export class IndexDashboardComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  commandStatus: boolean = false;
  isLoadingCommand = false;
  isLoadingSummary = false;
  commandResult = '';
  rawMonthWork: MonthWork[] = [];

  // Subject para manejo de subscripciones
  private destroy$ = new Subject<void>();
  private clockInterval?: number;

  // Servicios inyectados
  private readonly commandService = inject(CommandService);
  private readonly dashboardService = inject(DashboardService);
  readonly authService = inject(AuthService);

  ngOnInit():void {
    this.initializeClock();
    //this.getStatusCommand();
    this.loadInitialData();

  }
  ngOnDestroy():void {}

  private initializeClock(): void {
    this.clockInterval = window.setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  private loadInitialData(): void {
    this.getStatusCommand();
    this.getSummary();
  }

  runCommand() {
    if (this.isLoadingCommand) return;
    this.isLoadingCommand = true;
    this.commandService.postCommand()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Error al ejecutar comando:', err);
          const errorMessage = err.error?.message || 'Error al ejecutar el comando';
          console.error(errorMessage);
          return of({ message: 'Error en la ejecución' });
        }),
        finalize(() => {
          this.isLoadingCommand = false;
        })
      )
      .subscribe({
        next: (resp) => {
          const message = resp.message || 'Comando ejecutado exitosamente';
          alert(message);
          this.commandStatus = true;
          this.getStatusCommand();
        }
     });
  }

  getStatusCommand(): void {
    this.commandService.getStatusCommand()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Error al obtener estado del comando:', err);
          return of({ status: false });
        })
      )
      .subscribe({
        next: (resp) => {
          this.commandStatus = Boolean(resp.status);
        }
      });
  }

  getSummary(): void {
    if (this.isLoadingSummary) return;
    this.isLoadingSummary = true;


    this.dashboardService.getMonthWork()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Error al obtener resumen:', err);
          const errorMessage = err.error?.message || 'Error al cargar el resumen de trabajo';
          console.error('Error al obtener estado del comando:', err);
          return of({ summary: [] });
        }),
        finalize(() => {
          this.isLoadingSummary = false;
        })
      )
      .subscribe({
        next: (resp) => {
          this.rawMonthWork = resp.summary || [];
          //this.monthWork = this.transformDataForChart(this.rawMonthWork);
        }
      });





  }



}
