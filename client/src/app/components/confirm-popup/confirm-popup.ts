export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  color?: 'primary' | 'accent' | 'warn';
}
import { Component, inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-popup.html',
  styleUrls: ['./confirm-popup.css']
})
export class ConfirmPopup {
  public data: ConfirmDialogData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmPopup>);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}