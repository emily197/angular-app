import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { FormUtils } from 'src/app/utils/form-utils';
import { AreaService } from '../../../services/area.service';
import { ChangePassword } from 'src/app/interfaces/change-password.interface';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit{
  listTitle:string = 'Perfil';
  listSubTitle: string = 'Edición de perfil';
  myForm!: FormGroup;
  formUtils = FormUtils;
  areas: any;
  action: string = 'profile';
  myFormCredential!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ){}
  private areaService = inject(AreaService);







  activeFormProfile(){
    this.action = 'profile';
  }
  activeFormPass(){
    this.action = 'passw';

  }

  save(){
    this.userService
      .updateProfile(this.myForm.value)
      .subscribe({
        next: (resp) => {
          alert(resp.message || 'Usuario actualizado con éxito');
        },
        error: (err) => {
          alert(err.error?.message || 'Ups, ocurrio un problema');
        }
      })
  }

  getAreas(){
    this.areaService.getArea()
      .subscribe({
        next: (resp) => {
          this.areas = resp.areas;
        },
        error: (err) => {
          alert(err.error?.message || 'Ocurrió un problema');
        }
    });
  }


  savePassword() {
    console.log(this.myFormCredential.value);

    if (this.myFormCredential.valid) {
      const dto: ChangePassword = this.myFormCredential.value;
      this.userService.updateCredential(dto).subscribe({
        next: (resp) => {
          alert(resp.message || 'Contraseña actualizada con éxito');
          this.myFormCredential.reset();
        },
        error: (err) => {
          alert(err.error?.message || 'Ocurrió un problema');
        }
      });
    }
  }


  passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('password_confirmed')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }


  ngOnInit(): void {
    this.myFormCredential = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      password_confirmed: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });


    this.getAreas();
    this.myForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(10)]],
      email: new FormControl({ value: '', disabled: true }),
      full_name: ['', [Validators.required, Validators.maxLength(50)]],
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      second_last_name: ['', [Validators.maxLength(50)]],
      area_id: new FormControl({ value: '', disabled: true }),
    });

    this.userService.getProfile()
    .subscribe({
      next: (resp) => {
        this.myForm.patchValue({
          id: resp.user.id,
          name: resp.user.name,
          email: resp.user.email,
          full_name: resp.user.full_name,
          first_name: resp.user.first_name,
          second_last_name: resp.user.second_last_name,
          area_id: resp.user.area_id
          // No se incluye password porque no debe prellenarse
        });
      },
      error: (err) => {
        alert(err.error?.message || 'Ocurrió un problema');
      }
    });
  }

}
