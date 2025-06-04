import { Component, inject } from '@angular/core';
import { ListProductComponent } from '../../components/list-product/list-product.component';
import { ProductService } from 'src/app/store/services/product.service';



@Component({
    selector: 'app-car-page',
    imports: [ListProductComponent],
    templateUrl: './car-page.component.html'
})
export default class CarPageComponent {
  public productService = inject(ProductService);
  listTitle: string = 'Listado de productos';
  listSubTitle: string = 'Detalle de listado';
}
