import { Component } from '@angular/core';
import { HeaderMenuComponent } from "../header-menu/header-menu.component";
import { FooterMenuComponent } from "../footer-menu/footer-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderMenuComponent, FooterMenuComponent, RouterOutlet],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent { }
