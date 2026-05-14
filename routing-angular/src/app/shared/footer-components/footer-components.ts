import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-components',
  standalone: true,
  templateUrl: './footer-components.html',
  styleUrls: ['./footer-components.scss'],
})
export class FooterComponents {
  year = new Date().getFullYear();
}