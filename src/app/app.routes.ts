import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./store/components/layout/layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => import('./store/pages/home-page/home-page-routing.module').then(m => m.HomePageRoutingModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./store/pages/blog-page/blog-page-routing.module').then(m => m.BlogPageRoutingModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./store/pages/about-page/about-page-routing.module').then(m => m.AboutPageRoutingModule)
      },
      {
        path: 'car',
        loadChildren: () => import('./store/pages/car-page/car-page-routing.module').then(m => m.CarPageRoutingModule)
      },
      {
        path:  '**',
        redirectTo: 'blog'
      }
    ]
  },
  {
    path:  '**',
    redirectTo: ''
  }
];
