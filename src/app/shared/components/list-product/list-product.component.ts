import { CurrencyPipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'list-product',
    imports: [CurrencyPipe, UpperCasePipe, PercentPipe, RouterLink],
    templateUrl: './list-product.component.html'
})
export class ListProductComponent {

  products = input.required<Product[]>()
 constructor(
    private productService: ProductService,
  ){}

  @Output() productDeleted = new EventEmitter<void>();

  deleteProduct(id: string){
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
        alert('Eliminación exitosa');
        this.productDeleted.emit();
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        alert('Ocurrió un error al eliminar el producto.');
      }
      });
    }
  }
}
