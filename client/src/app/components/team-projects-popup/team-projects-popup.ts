import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateProjectModal } from '../create-project-modal/create-project-modal';
import { Project } from '../../models/project.model';
import { PrjectsService } from '../../services/projects/prjects-service';
import { ProjectStore } from '../../state/project/project.store';

export interface TeamProjectsData {
  teamId: string;
  teamName: string;
}

@Component({
  selector: 'app-team-projects-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './team-projects-popup.html',
  styleUrls: ['./team-projects-popup.css']
})
export class TeamProjectsPopup implements OnInit {
  private projectsService = inject(PrjectsService);
  private projectStore = inject(ProjectStore);
  private popup = inject(MatDialog);
  
  projects = this.projectStore.allProjects;
  loading = this.projectStore.loading;

  constructor(
    public dialogRef: MatDialogRef<TeamProjectsPopup>,
    @Inject(MAT_DIALOG_DATA) public data: TeamProjectsData
  ) {}

  async ngOnInit() {
    await this.loadTeamProjects();
  }

  async loadTeamProjects() {
    await this.projectsService.getProjectsByTeam(this.data.teamId);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAddProject(): void {
    const dialogRef = this.popup.open(CreateProjectModal, {
      width: '500px',
      data: {
        teamId: this.data.teamId // שולחים את ה-teamId כדי שיהיה נבחר ונעול
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectsService.createProject(
          result.teamId,
          result.name,
          result.description
        );
        // רענון הפרויקטים של ה-team
        this.loadTeamProjects();
      }
    });
  }

  onProjectClick(project: Project): void {
    // TODO: Navigate to project details
  }
}
