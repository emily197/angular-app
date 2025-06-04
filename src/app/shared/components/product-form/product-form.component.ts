import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  @Input({ required: true }) myForm!: FormGroup;
  //myForm!: FormGroup;
  formUtils = FormUtils;
 }
