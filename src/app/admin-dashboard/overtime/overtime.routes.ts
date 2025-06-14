import { Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { OvertimeMonthComponent } from "./overtime-month/overtime-month.component";


export const overtimeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'month',
        component: OvertimeMonthComponent
      }
    ]
  }


];
