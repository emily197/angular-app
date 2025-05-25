import { CurrencyPipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'list-product',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe, PercentPipe],
  templateUrl: './list-product.component.html',
})
export class ListProductComponent {
  products = input.required<Product[]>()
}
