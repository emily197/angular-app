
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
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
  action: string = 'edit';

 /* constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    // Siempre inicializa en el constructor o antes del ngOnInit
    this.myForm = this.fb.group({
      id: 13,
      name: ['', Validators.required],
      barcode: ['', Validators.required],
      slug: ['', Validators.required],
      image: ['', Validators.required],

      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],

      categoryId: ['', Validators.required],
      brand: ['', Validators.required],

      price: [0, [Validators.required, Validators.min(1), Validators.max(20000)]],
      discountPrice: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      cost: [0, [Validators.required, Validators.min(1), Validators.max(20000)]],
      stock: [0, [Validators.required, Validators.min(1), Validators.max(20000)]],
      unit: ['', Validators.required],
      isActive: [false, Validators.required],
    });
  }*/

/*
  onSave() {
    //console.log(this.myForm.value);
    if (this.action == 'edit') {
      //console.log(this.myForm.value);
      console.log('edit')
    }
    else {
      console.log('save');

      this.productService.addProduct(this.myForm.value).subscribe(product => {
        console.log('se registro')
      })



    }
  }


*/
 }
