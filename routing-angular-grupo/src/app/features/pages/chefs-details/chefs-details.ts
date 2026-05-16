import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable,switchMap } from 'rxjs';
import { ChefsService } from '../../services/chefs.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({

  selector: 'app-chefs-details',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],

  templateUrl: './chefs-details.html',
  styleUrls: ['./chefs-details.scss'],
})

export class ChefsDetails {

  chef$: Observable<any>;
  loading = signal(true);
  originalOrder = () => 0;

  constructor(
    private route: ActivatedRoute,
    private chefsService: ChefsService
  ) {

    this.chef$ = this.route.paramMap.pipe(

      switchMap(params => {

        const id = params.get('id')!;
        return this.chefsService.getChefById(id);

      })

    );

    this.chef$.subscribe(() => {

      this.loading.set(false);

    });
  }
}