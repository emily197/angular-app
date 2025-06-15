import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';


@Component({
    selector: 'home-page',
    imports: [],
    templateUrl: './home-page.component.html'
})

export default class HomePageComponent implements OnInit {
  private productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    /*this.productService.getProducts().subscribe(data => {
      console.log('data =>', data)
      this.products = data
    });*/
  }

}
