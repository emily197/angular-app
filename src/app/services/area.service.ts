import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { delay, Observable } from "rxjs";
import { Area } from "../interfaces/area.interface";



@Injectable({ providedIn: 'root' })
export class AreaService {
  envs = environment;

  constructor(private http: HttpClient){}

  getArea(): Observable<{ areas: Area[] }> {
  return this.http.get<{ areas: Area[] }>(
    `${this.envs.apiUrl}/areas`)
      .pipe(
        delay(0)
      );
  }

}
