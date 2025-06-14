import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';

@Component({
  selector: 'app-edit',
  imports: [UserFormComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit{
  listTitle: string = 'Usuario';
  listSubTitle: string = 'Editar usuario';
  productId!: string;
  user?: User;
  myForm!: FormGroup;
  action: string = 'Actualizar';
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)],],
      email: new FormControl({value: '', disabled: true }),
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      role: ['', Validators.required],
      area_id: ['']
    });
  }

  save(){
    console.log(this.myForm.value);
    console.log(this.id);

    this.userService
      .update(this.id, this.myForm.value)
      .subscribe({
        next: (resp) => {
          alert(resp.message || 'Usuario actualizado con éxito');
        },
        error: (err) => {
          alert(err.error?.message || 'Ups, ocurrio un problema');
        }
      })

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        this.id = idParam;
        this.userService.getById(idParam).subscribe(data => {
          this.user = data.user;
          console.log(data.user);
          this.myForm.patchValue({
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
            password: '',
            role: this.user.role,
            area_id: this.user.area_id
          });
        })
      }
      else {
        console.log('fuimos al 404');
      }
    })
  }

}
