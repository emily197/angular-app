import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { delay, Observable } from "rxjs";
import { MonthWork } from '../interfaces/month-work.interface.';


@Injectable({ providedIn: 'root' })
export class DashboardService {
  envs = environment;

  constructor(private http: HttpClient){}

  getSessionStatus(): Observable<{ status: boolean }> {
  return this.http.get<{ status: boolean }>(
    `${this.envs.apiUrl}/initialize-session`)
      .pipe(
        delay(0)
      );
  }

  getMonthWork(): Observable<{ summary : MonthWork[] }> {
  return this.http.get<{ summary : MonthWork[] }>(
    `${this.envs.apiUrl}/dash-month-work`)
      .pipe(
        delay(0)
      );
  }


}
