import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { TableGenericComponent } from "../../shared/components/table-generic/table-generic.component";

@Component({
  selector: 'app-product-page',
  imports: [RouterLink, TableGenericComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit{

  private productService = inject(ProductService);
  products: Product[] = [];
  listTitle: string = 'Producto';
  listSubTitle: string = 'Listado';
  columns:any = [
    { label: 'Name', field: 'name'},
    { label: 'Category', field: 'categoryId'},
    { label: 'Amount', field: 'price', type: 'currency'},
    { label: 'Quantity', field: 'stock'},
    { label: 'Desc', field: 'discountPrice' },
    { label: 'Total', field: 'price'}
  ];

  actions: any = [
    {
      icon: 'fa-solid fa-pen-to-square',
      tooltip: 'Editar',
      routerLink: (row: any) => ['/admin/product/edit/', row.id]
    },
    {
      icon: 'fa-solid fa-trash',
      tooltip: 'Eliminar',
      callback: this.deleteProduct.bind(this)
    }
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe(data => {
      console.log('data =>', data)
      this.products = data
    });
  }

  deleteProduct(id: string){
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
        alert('Eliminación exitosa');
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        alert('Ocurrió un error al eliminar el producto.');
      }
      });
    }
  }

// ...existing code...
showSideModal = false;

openSideModal() {
  this.showSideModal = true;
}

closeSideModal() {
  this.showSideModal = false;
}
// ...existing code...

}
