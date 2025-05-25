import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './home-page.component.html'
})
export default class HomePageComponent {
  productService = inject(ProductService);

  productsWithDiscount = this.productService.products().filter((item) => item.discount > 0 );

 }
