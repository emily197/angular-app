import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormUtils } from 'src/app/utils/form-utils';
import { ProductFormComponent } from "../../shared/components/product-form/product-form.component";

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [ReactiveFormsModule, ProductFormComponent, RouterLink],
  templateUrl: './product-new.component.html',
})
export class ProductNewComponent {
  myForm!: FormGroup;
  formUtils = FormUtils;
  action:string = 'new';
  listTitle:string = 'Productos';
  listSubTitle: string = 'Crear nuevo producto';

constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    // Siempre inicializa en el constructor o antes del ngOnInit
    this.myForm = this.fb.group({
      id: [null],
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
  }

   onSave() {
    this.productService
      .addProduct(this.myForm.value)
      .subscribe(product => {
      console.log('se registro');
      alert('Se registro correctamente');
    })
  }
}
