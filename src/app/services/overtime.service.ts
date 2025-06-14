import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { delay, Observable } from "rxjs";
import { Employee } from "../interfaces/employee.interface";
import { Overtime } from "../interfaces/overtime.interface";

@Injectable({ providedIn: 'root' })
export class OvertimeService {

  envs = environment;

  constructor(private http: HttpClient) {}

  getOvertimes(): Observable<{ employees: Employee[]}> {
    return this.http.get<{ employees: Employee[]}>(
      `${this.envs.apiUrl}/overtimes`)
        .pipe(
          delay(0)
      );
  }

  showOvertime(id: number, type: string): Observable<{ employee: Employee }> {
    return this.http.get<{ employee: Employee }> (
      `${this.envs.apiUrl}/overtimes/${id}/${type}`)
        .pipe(
          delay(0)
        );
  }

  postOvertime(overtime: any): Observable<{ message: string }> {
    return this.http.post<{ message : string }> (
      `${this.envs.apiUrl}/overtimes`,
        overtime)
        .pipe(
          delay(0)
        );
  }

  getOvertimesMonth(month: number): Observable<{ overtimes: Employee[]}> {
    return this.http.get<{ overtimes: Employee[]}>(
      `${this.envs.apiUrl}/overtimes/${month}`)
        .pipe(
          delay(0)
      );
  }

  showOvertimeDetail(id: number, month: number): Observable<{ employee: Employee }> {
    return this.http.get<{ employee: Employee }>(
      `${this.envs.apiUrl}/overtimes/detail/${id}/${month}`)
        .pipe(
          delay(0)
    );
  }






}
