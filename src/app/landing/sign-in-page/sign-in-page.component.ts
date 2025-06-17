import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in-page.component.html',
})
export class SignInPageComponent {

  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
   hasError = signal(false);
 // private userService = inject(UserService);
  recover: string = '/';

  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly email = computed(() => this.form.controls.email);
  readonly password = computed(() => this.form.controls.password);

  authService = inject(AuthService)
  // Usamos FormBuilder para crear el formulario reactivo
  onLogin(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email = '', password = '' } = this.form.value;
    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        this.router.navigate(['/admin/dashboard']);
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      });
    })




    // this.userService.login(this.form.getRawValue()).subscribe({
    //   next: (res) => {
    //     localStorage.setItem('access_token', res.access_token);
    //     localStorage.setItem('user', JSON.stringify(res.user));
    //     //this.router.navigate(['/admin/dashboard']);
    //     this.router.navigate(['/admin/employee']);
    //   },
    //   error: (err) => {
    //     this.error = err.error ?.message || 'Credenciales incorrectas';

    //   },
    // });



  }



}
