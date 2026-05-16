import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chefs-dialogue',
  standalone: true,

  imports: [
    MatDialogModule,
    MatButtonModule
  ],

  templateUrl: './chefs-dialogue.html',
  styleUrls: ['./chefs-dialogue.scss'],
})

export class ChefsDialogue {

  constructor(
    public dialogRef: MatDialogRef<ChefsDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}