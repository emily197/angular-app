import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
    selector: 'footer-menu',
    imports: [RouterLink],
    templateUrl: './footer-menu.component.html'
})
export class FooterMenuComponent {
  route: string = '/'
  pathImage: string = './images/footer.jpg';
  envs = environment;
}
