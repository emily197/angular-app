import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';


interface MenuOption {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-menu-lateral',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-lateral.component.html',
})



export class MenuLateralComponent {
  authService = inject(AuthService);

  menuOptions: MenuOption[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'fa-solid fa-chart-simple' },
    { label: 'Employee', route: '/admin/employee', icon: 'fa-solid fa-users-line' },
    { label: 'Overtime', route: '/admin/overtime', icon: 'fa-solid fa-clock' },
    { label: 'Overtime month', route: '/admin/overtime/month', icon: 'fa-solid fa-calendar' },
    ...(this.authService.user()?.role === 'SUPER' ? [{
      label: 'Usuario',
      route: '/admin/user',
      icon: 'fa-solid fa-users'
    }] : []),
    { label: 'Profile', route: '/admin/profile', icon: 'fa-solid fa-circle-user' },
  ];



  // menuOptions: MenuOption[] = [
  //   { label: 'Dashboard', route: '/', icon: 'fa-solid fa-chart-simple'},
  //   { label: 'Employee', route: '/admin/employee', icon: 'fa-solid fa-users-line'},
  //   { label: 'Overtime', route: '/admin/overtime', icon: 'fa-solid fa-clock'},
  //   { label: 'Overtime month', route: '/admin/overtime/month', icon: 'fa-solid fa-calendar'},
  //   { label: 'Profile', route:'/admin/profile', icon: 'fa-solid fa-circle-user' },
  // ];


  // this.authService.user()?.role === 'SUPER' ? (
  //   this.menuOptions.splice(4, 0, {
  //     label: 'Usuario',
  //     route: '/admin/user',
  //     icon: 'fa-solid fa-users'
  //   });
  // )



  /*
  userLogIn: User | null;

  constructor(private authService: AuthService) {
    this.userLogIn = this.authService.getUser();
  }
*/
  // logoutUser() {
  //   this.authService.logout();
  // }

}
