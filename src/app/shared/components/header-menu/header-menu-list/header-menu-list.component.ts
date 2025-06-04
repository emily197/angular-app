import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  label: string;
  route: string;
}

@Component({
    selector: 'header-menu-list',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header-menu-list.component.html'
})
export class HeaderMenuListComponent {
  menuOptions: MenuOption[] = [
    { label: 'Inicio', route: '/'},
    { label: 'Blog', route: '/blog'},
    { label: 'About', route: '/about'},
    { label: 'Car', route: '/car'}
  ];

}
