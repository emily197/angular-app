import { Component, inject, OnInit } from '@angular/core';
import { ListProductComponent } from "../../shared/components/list-product/list-product.component";
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-page',
  imports: [ListProductComponent, RouterLink],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit{

  private productService = inject(ProductService);
  products: Product[] = [];
  listTitle: string = 'Producto';
  listSubTitle: string = 'Listado';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe(data => {
      console.log('data =>', data)
      this.products = data
    });
  }

}
