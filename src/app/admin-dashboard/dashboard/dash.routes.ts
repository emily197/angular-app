import { Routes } from '@angular/router';
import { IndexDashboardComponent } from './index-dashboard/index-dashboard.component';
;

export const dashbordRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexDashboardComponent
      }
    ]
  }
];
