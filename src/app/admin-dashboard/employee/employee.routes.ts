import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const employeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeeListComponent
      },
      {
        path: 'save-address',
        component: EmployeeListComponent,
      }
    ]

  }
];
