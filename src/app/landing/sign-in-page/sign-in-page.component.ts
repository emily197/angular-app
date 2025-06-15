import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in-page.component.html',
})
export class SignInPageComponent {

  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  recover: string = '/';

  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly email = computed(() => this.form.controls.email);
  readonly password = computed(() => this.form.controls.password);

  // Usamos FormBuilder para crear el formulario reactivo
  onLogin(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        console.log('entro aquii 1?');
        localStorage.setItem('access_token', res.access_token);
        console.log('entro aquii 2?');
        //this.router.navigate(['/admin/dashboard']);
        this.router.navigate(['/admin/employee']);
        console.log('entro aquii 3?');
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
        console.log('entro aquii 4?');
      },
    });
  }



}
