import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';


@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule, ProductFormComponent, RouterLink],
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      id: ['', Validators.required],
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
  listTitle: string = 'Producto';
  listSubTitle: string = 'Editar producto';
  formUtils = FormUtils;
  productId!: string;
  product?: Product;
  myForm!: FormGroup;
  action: string = 'edit';

  //this.productService = inject(ProductService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.productId = idParam;

        this.productService.getProductById(this.productId).subscribe({
          next: data => {
            this.product = data;
            this.myForm.patchValue({
              id: data.id,
              name: data.name,
              barcode: data.barcode,
              slug: data.slug,
              image: data.image,

              shortDescription: data.shortDescription,
              longDescription: data.longDescription,

              categoryId: data.categoryId,
              brand: data.brand,

              price: data.price,
              discountPrice: data.discountPrice,
              cost: data.cost,
              stock: data.stock,
              unit: data.unit,
              isActive: true,
            });
          },
          error: err => {
            console.error('Error al obtener el producto', err);
          }
        });
      }
    });
  }

   onSave() {
      this.productService
        .updateProduct(this.productId, this.myForm.value)
        .subscribe(product => {
        alert('se actualizaron los datos')
      })
    }
}
