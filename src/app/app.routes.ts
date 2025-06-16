import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { AuthGuard } from './guards/auth.guard';

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
    canMatch: [AuthGuard
      //  () => {
      //  console.log('guard esta aqui xd');
      //    //return true;
      //  },
      // NotAuthenticatedGuard
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./landing/404-page/404-page.component').then(m => m.NotFoundComponent)
  }
]






