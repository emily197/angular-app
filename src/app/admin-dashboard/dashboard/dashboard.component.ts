import { Component } from '@angular/core';
import { MenuLateralComponent } from "../../shared/components/menu-lateral/menu-lateral.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MenuLateralComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {



}
