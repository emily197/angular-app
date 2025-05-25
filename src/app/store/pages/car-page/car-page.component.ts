import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ListProductComponent } from '../../components/list-product/list-product.component';


@Component({
  selector: 'app-car-page',
  standalone: true,
  imports: [ListProductComponent],
  templateUrl: './car-page.component.html',
})
export default class CarPageComponent {
  public productService = inject(ProductService);
  listTitle: string = 'Listado de productos';
  listSubTitle: string = 'Detalle de listado';
}
