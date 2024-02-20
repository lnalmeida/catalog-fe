import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/models/Category';

@Component({
  selector: 'app-confirm-delete-deialog',
  templateUrl: './confirm-delete-deialog.component.html',
  styleUrls: ['./confirm-delete-deialog.component.scss']
})
export class ConfirmDeleteDeialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDeialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string  }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
