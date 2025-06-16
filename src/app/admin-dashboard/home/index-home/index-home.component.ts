import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from 'src/app/shared/components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-index-home',
  imports: [MenuLateralComponent, RouterOutlet],
  templateUrl: './index-home.component.html',
})
export class IndexHomeComponent { }
