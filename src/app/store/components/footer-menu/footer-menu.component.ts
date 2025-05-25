import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footer-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer-menu.component.html',
})
export class FooterMenuComponent {
  route: string = '/'
}
