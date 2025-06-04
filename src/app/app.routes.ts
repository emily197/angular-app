import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./landing/landing.routes').then((m) => m.landingRoutes ),
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin.routes').then((m) => m.adminRoutes),
  }




]






