import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Area } from 'src/app/interfaces/area.interface';
import { AreaService } from 'src/app/services/area.service';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit{

  @Input({ required: true}) myForm!: FormGroup;
  @Input() action!: string;
  formUtils = FormUtils;
  areas: Area[] = [];
   private areaService = inject(AreaService);

  getAreas(){
    this.areaService.getArea()
      .subscribe(data => {
        this.areas = data.areas;
      });
  }

  ngOnInit(){
    this.getAreas();
  }
}
