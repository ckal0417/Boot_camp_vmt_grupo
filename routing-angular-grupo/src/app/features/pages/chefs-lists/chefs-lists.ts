import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ChefsService } from '../../services/chefs.service';
import { ChefsInterface } from '../../interfaces/chefs.interface';
import { ChefsDialogue } from '../chefs-dialogue/chefs-dialogue';
import { ChefsForm } from '../chefs-form/chefs-form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({

  selector: 'app-chefs-lists',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],

  templateUrl: './chefs-lists.html',
  styleUrls: ['./chefs-lists.scss'],
})

export class ChefsLists {

  loading = signal(true);
  chefs$: Observable<ChefsInterface[]>;

  constructor(
    private chefsService: ChefsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

    this.chefs$ = this.chefsService.getChefs();

    this.chefs$.subscribe(() => {

      this.loading.set(false);

    });

  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(
      ChefsForm,
      {
        width: '500px',
        data: null
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.chefs$ = this.chefsService.getChefs();

      }
    });
  }

  openEditDialog(chef: any) {

    const dialogRef = this.dialog.open(
      ChefsForm,
      {
        width: '500px',
        data: chef
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.chefs$ = this.chefsService.getChefs();

      }
    });
  }

  openDeleteDialog(chef: any) {

    const dialogRef = this.dialog.open(
      ChefsDialogue,
      {
        width: '450px',
        data: chef
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.chefsService
        .deleteChef(chef.id)
        .subscribe({

          next: () => {

            this.snackBar.open(
              'Chef deleted successfully',
              'Close',
              {
                duration: 5000
              }
            );

            this.chefs$ =
              this.chefsService.getChefs();

          },

          error: () => {

            this.snackBar.open(
              'Error deleting chef',
              'Close',
              {
                duration: 7000
              }
            );
          }
        });
      }
    });
  }
}