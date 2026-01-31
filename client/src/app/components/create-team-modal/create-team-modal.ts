import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-team-dialog',
  standalone: true, 
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-team-modal.html',
})
export class CreateTeam {
  teamName: string = ''; 

  constructor(private dialogRef: MatDialogRef<CreateTeam>) {}

  onCancel(): void {
    this.dialogRef.close(); 
  }
}