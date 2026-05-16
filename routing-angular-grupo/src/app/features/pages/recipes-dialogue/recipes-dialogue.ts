import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipes-dialogue',

  standalone: true,

  imports: [
    MatDialogModule,
    MatButtonModule
  ],

  templateUrl: './recipes-dialogue.html',
  styleUrls: ['./recipes-dialogue.scss'],
})

export class RecipesDialogue {

  constructor(

    public dialogRef:
      MatDialogRef<RecipesDialogue>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {}

  confirm() {

    this.dialogRef.close(true);

  }

  cancel() {

    this.dialogRef.close(false);

  }

}