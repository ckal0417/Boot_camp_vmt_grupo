import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  app = "Mi App Estudiantil";
  nombre = "Cristopher Vera";
  conectado = false;

}

