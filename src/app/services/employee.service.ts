import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee.interface';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  envs = environment;

  constructor(private http: HttpClient){}

  getEmployees(filter: string): Observable<{ employees: Employee[] }> {
  return this.http.get<{ employees: Employee[] }>(
    `${this.envs.apiUrl}/employees`,
    {
      params: {filter}
    }
  )
      .pipe(
        delay(0)
      );
  }

  showEmployee(id: number): Observable<{ employee: Employee }> {
    return this.http.get<{ employee: Employee }> (
      `${this.envs.apiUrl}/employees/${id}`)
        .pipe(
          delay(0)
        );
  }

  update(id: number, ip_address: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.envs.apiUrl}/employees/${id}`,
      { ip_address })
      .pipe(
        delay(0)
      );
  }

  /*
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.envs.apiUrl}/employees`)
      .pipe(
        delay(0)
      );
  }
  */



}


