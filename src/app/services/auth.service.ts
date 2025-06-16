import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { catchError, Observable, map, of } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  constructor(private router: Router, private userService: UserService) {
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    if (userStr && tokenStr) {
      this._user.set(JSON.parse(userStr));
      this._token.set(tokenStr);
    }
  }

  user = computed(() => this._user());
  token = computed(() => this._token());

  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });


  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      console.log('si tengo acceso');

      return of(false);
    }
    return of(true);
  }

  //* borrar datos de localstorage
  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this._user.set(null);
        this._token.set(null);
        this.router.navigate(['/sign-in']);
        this._authStatus.set('not-authenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },
      error: () => {
        // Incluso si falla el logout en backend, que limpiee el storage
        this._user.set(null);
        this._token.set(null);
        this.router.navigate(['/sign-in']);
        this._authStatus.set('not-authenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    });
  }

  //obtener el user que deje si lo encuentra
  getUser(): User | any{
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string): Observable<boolean> {
     return this.http
      .post<AuthResponse>(`${baseUrl}/login`, {
        email: email,
        password: password,
     })
     .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

}

