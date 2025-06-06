import { Routes } from "@angular/router";
import BlogPageComponent from "./blog-page/blog-page.component";
import AboutPageComponent from "./about-page/about-page.component";
import HomePageComponent from "./home-page/home-page.component";


export const landingRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'blog',
    component: BlogPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-up'
  },
]
