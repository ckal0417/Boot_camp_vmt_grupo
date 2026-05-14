import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-students-dialogue',
  standalone: true,

  imports: [
    MatDialogModule,
    MatButtonModule
  ],

  templateUrl: './students-dialogue.html',
  styleUrls: ['./students-dialogue.scss'],
})

export class StudentsDialogue {

  constructor( public dialogRef: MatDialogRef<StudentsDialogue>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}