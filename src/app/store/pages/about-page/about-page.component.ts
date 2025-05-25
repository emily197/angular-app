import { Component } from '@angular/core';

interface Founder {
    name: string;
    position: string;
    src: string;
}

const founders: Founder[] = [
    {name: 'Ryan Samnuel', position: 'Co-founder', src:'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/david-ui/img/avatar-1.jpg'},
    {name: 'Jordan Michael', position: 'Front-End Developer', src:'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/david-ui/img/avatar-2.jpg'},
    {name: 'Nora Hazel', position: 'UI/UX Designer', src:'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/david-ui/img/avatar-3.jpg'},
    {name: 'Otto Gonzalez', position: 'Marketing Specialist', src:'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/david-ui/img/avatar-4.jpg'},
  ];

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',

})
export default class AboutPageComponent {

  founders = founders;
}
