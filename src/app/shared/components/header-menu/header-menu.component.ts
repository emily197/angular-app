import { Component } from '@angular/core';
import { HeaderMenuListComponent } from "./header-menu-list/header-menu-list.component";
import { RouterLink } from '@angular/router';
import { environment } from '@environments/environment'

@Component({
    selector: 'header-menu',
    standalone: true,
    templateUrl: './header-menu.component.html',
    imports: [HeaderMenuListComponent, RouterLink]
})
export class HeaderMenuComponent {
  route: string =  '/';
  envs = environment
}
