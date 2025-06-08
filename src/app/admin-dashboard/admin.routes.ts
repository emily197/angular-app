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
      },
      {
        path:'employee',
        loadChildren: () => import('./employee/employee.routes').then(m => m.employeeRoutes)
      },
      {
        path: 'extra-time',
        loadChildren: () => import('./extra-time-month/extra-time.routes').then(m => m.extraTimeRoutes)
      }
    ]
  }

];
