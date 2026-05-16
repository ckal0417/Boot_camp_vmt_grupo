import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponents } from './shared/header-components/header-components';
import { FooterComponents } from './shared/footer-components/footer-components';
import { NavbarComponents } from './shared/navbar-components/navbar-components';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    HeaderComponents,
    FooterComponents,
    NavbarComponents
  ],

  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})

export class App {

  title = signal('Routing Angular');

}