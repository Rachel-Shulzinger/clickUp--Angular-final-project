import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../models/project.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>{{ data.project.name }}</h2>
    <mat-dialog-content>
      <div class="details-row">
        <strong>Description:</strong>
        <p>{{ data.project.description || 'No description provided.' }}</p>
      </div>
      <div class="details-row">
        <strong>Status:</strong>
        <p>Active</p>
      </div>
      <div class="details-row">
        <strong>ID:</strong>
        <p>{{ data.project.id }}</p>
      </div>
      @if(data.project.teamId) {
        <div class="details-row">
            <strong>Team ID:</strong>
            <p>{{ data.project.teamId }}</p>
        </div>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="'view-tasks'">View Tasks</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .details-row { margin-bottom: 16px; }
    strong { display: block; margin-bottom: 4px; color: #555; }
    p { margin: 0; color: #222; }
  `]
})
export class ProjectDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { project: Project }) {}
}
