import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interface";
import { delay, Observable } from "rxjs";
import { environment } from "@environments/environment";
import { Injectable } from "@angular/core";




@Injectable({ providedIn: 'root' })
export class UserService {
   envs = environment;


  constructor(private http: HttpClient) {}

  login(credentials: {email: string; password: string}): Observable<{ access_token: string }> {
     return this.http.post<{ access_token: string }>
     (`${this.envs.apiUrl}/login`, credentials);
  }

  listUser(filter: string): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(
      `${this.envs.apiUrl}/users`,
    {
      params: {filter}
    })
      .pipe(
        delay(0)
    );
  }

  register(user: any): Observable<{message: string }> {
    return this.http.post<{ message: string }> (
      `${this.envs.apiUrl}/register`,
      user)
      .pipe(
        delay(0)
      );
  }

  getById(id: string): Observable<{user: User}> {
    return this.http.get<{user: User}>(
      `${this.envs.apiUrl}/users/${id}`)
      .pipe(
        delay(0)
      );
  }

  update(id:string, user: User): Observable<{message: string}> {
    return this.http.put<{ message: string }>(
     `${this.envs.apiUrl}/users/${id}`,
      user)
      .pipe(
        delay(0)
      );
  }

  delete(id:string): Observable<{message: string}> {
    return this.http.delete<{ message: string }>(
     `${this.envs.apiUrl}/users/${id}`)
      .pipe(
        delay(0)
      );
  }




}

