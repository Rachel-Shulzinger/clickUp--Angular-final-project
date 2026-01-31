import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TeamStore } from '../../state/team/team.store';
import { TeamsService } from '../../services/teams/teams-service';

export interface CreateProjectData {
  teamId?: string; 
}

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './create-project-modal.html',
  styleUrl: './create-project-modal.css'
})
export class CreateProjectModal implements OnInit {
  private teamStore = inject(TeamStore);
  private teamsService = inject(TeamsService);
  
  projectName: string = '';
  projectDescription: string = '';
  selectedTeamId: string | undefined = undefined;
  
  teams = this.teamStore.allTeams;

  constructor(
    private dialogRef: MatDialogRef<CreateProjectModal>,
    @Inject(MAT_DIALOG_DATA) public data?: CreateProjectData
  ) {}

  ngOnInit() {
    // טעינת teams אם אין
    if (this.teams().length === 0) {
      this.teamsService.getTeams();
    }
    
    // אם נשלח teamId, נבחר אותו אוטומטית ונעל אותו
    if (this.data?.teamId) {
      this.selectedTeamId = this.data.teamId;
    }
  }

  getSelectedTeamName(): string | undefined {
    if (!this.selectedTeamId) return undefined;
    const team = this.teams().find(t => t.id === this.selectedTeamId);
    return team?.name;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.projectName.trim() && this.selectedTeamId) {
      const result = {
        name: this.projectName.trim(),
        description: this.projectDescription.trim() || undefined,
        teamId: this.selectedTeamId
      };
      this.dialogRef.close(result);
    }
  }

  isValid(): boolean {
    return this.projectName.trim().length > 0 && !!this.selectedTeamId;
  }

  isTeamLocked(): boolean {
    return !!this.data?.teamId;
  }
}
