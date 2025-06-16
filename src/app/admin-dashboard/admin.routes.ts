import { Routes } from "@angular/router";
import { IndexHomeComponent } from "./home/index-home/index-home.component";
//import { DashboardComponent } from "./dashboard/dashboard.component";


export const adminRoutes: Routes = [
  {
    path: '',
    component: IndexHomeComponent,
    children: [
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dash.routes').then(m => m.dashbordRoutes) },
      { path: 'employee', loadChildren: () => import('./employee/employee.routes').then(m => m.employeeRoutes) },
      { path: 'extra-time', loadChildren: () => import('./extra-time-month/extra-time.routes').then(m => m.extraTimeRoutes) },
      { path: 'overtime', loadChildren: () => import('./overtime/overtime.routes').then(m => m.overtimeRoutes) },
      { path: 'user', loadChildren: () => import('./users/user.routes').then(m => m.userRoutes) },
      { path: 'profile', loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes)}
    ]
  }
];
