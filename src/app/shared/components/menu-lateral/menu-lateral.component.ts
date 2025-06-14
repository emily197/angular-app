import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  menuOptions: MenuOption[] = [
    { label: 'Dashboard', route: '/', icon: 'fa-solid fa-chart-simple'},
    { label: 'Employee', route: '/admin/employee', icon: 'fa-solid fa-users-line'},
    { label: 'Overtime', route: '/admin/overtime', icon: 'fa-solid fa-clock'},
    { label: 'Overtime month', route: '/admin/overtime/month', icon: 'fa-solid fa-calendar'},
  ];




}
