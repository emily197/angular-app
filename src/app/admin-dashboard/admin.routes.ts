import { Routes } from "@angular/router";
import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductNewComponent } from "./product-new/product-new.component";


export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product',
        component: ProductPageComponent
      },
      {
        path:'product/edit/:id',
        component: ProductEditComponent
      },
      {
        path:'product/create',
        component: ProductNewComponent
      }
    ]

  }

];
