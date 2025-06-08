import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';


export const extraTimeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'detail/:id',
        component: IndexComponent,
      }
    ]
  }


];
