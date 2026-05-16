import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header-components',
  standalone: true,
  imports: [
    
    MatToolbarModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './header-components.html',
  styleUrls: ['./header-components.scss'],
})
export class HeaderComponents {}