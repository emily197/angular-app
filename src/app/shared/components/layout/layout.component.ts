import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { FooterMenuComponent } from '../footer-menu/footer-menu.component';

@Component({
    selector: 'app-layout',
    imports: [HeaderMenuComponent, FooterMenuComponent, RouterOutlet],
    templateUrl: './layout.component.html'
})
export default class LayoutComponent { }
