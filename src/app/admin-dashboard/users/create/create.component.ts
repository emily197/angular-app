import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormUtils } from 'src/app/utils/form-utils';
import { UserFormComponent } from "../../../shared/components/user-form/user-form.component";
import { UserService } from 'src/app/services/user.service';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/interfaces/area.interface';

@Component({
  selector: 'app-create',
  imports: [RouterLink, UserFormComponent, ReactiveFormsModule],
  templateUrl: './create.component.html',
})

export class CreateComponent{
  listTitle:string = 'Usuarios';
  listSubTitle: string = 'Registro de  producto';
  myForm!: FormGroup;
  formUtils = FormUtils;
  action: string = 'Registrar';
  areas: Area[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)],],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      role: ['', Validators.required],
      password_confirmation: [''],
      area_id: ['']
    });
  }

  onSave() {
    console.log(this.myForm.value);
    const formValue = this.myForm.value;
    formValue.password_confirmation = formValue.password;

    this.userService.register(formValue)
      .subscribe({
        next: (res) => {
          alert(res.message || 'Registrado con éxito');
        },
        error: (error) => {
          alert('Error al registrar');
          console.log(error);
        }
      }
      )
  }



}
