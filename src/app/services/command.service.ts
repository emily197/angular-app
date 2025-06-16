import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  envs = environment;

  constructor(private http: HttpClient) { }

  postCommand():Observable <{ message: string }> {
    return this.http.post<{ message : string }> (
      `${this.envs.apiUrl}/initialize-session`, [])
          .pipe(
            delay(0)
      );
  }

  getStatusCommand(): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(
      `${this.envs.apiUrl}/dash-status-session`)
        .pipe(
          delay(0)
        );
    }

}
