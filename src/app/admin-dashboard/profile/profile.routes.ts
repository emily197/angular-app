import { Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";


export const profileRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
];
