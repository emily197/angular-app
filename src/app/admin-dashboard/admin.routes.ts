import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";


export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
      { path: 'employee', loadChildren: () => import('./employee/employee.routes').then(m => m.employeeRoutes) },
      { path: 'extra-time', loadChildren: () => import('./extra-time-month/extra-time.routes').then(m => m.extraTimeRoutes) },
      { path: 'overtime', loadChildren: () => import('./overtime/overtime.routes').then(m => m.overtimeRoutes) },
      { path: 'user', loadChildren: () => import('./users/user.routes').then(m => m.userRoutes) }
    ]
  }
];

/*

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
*/
