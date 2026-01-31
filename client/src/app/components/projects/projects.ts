import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectModal } from '../create-project-modal/create-project-modal';
import { PrjectsService } from '../../services/projects/prjects-service';
import { TaskService } from '../../services/tasks/task-service';
import { ProjectStore } from '../../state/project/project.store';
import { TeamStore } from '../../state/team/team.store';
import { TaskStore } from '../../state/task/task.store';
import { Project } from '../../models/project.model';

import { ProjectDetailsDialog } from './project-details-dialog';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private projectsService = inject(PrjectsService);
  private taskService = inject(TaskService);
  private projectStore = inject(ProjectStore);
  private teamStore = inject(TeamStore);
  private taskStore = inject(TaskStore);
  private popup = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projects = this.projectStore.allProjects;
  loading = this.projectStore.loading;
  allTasks = this.taskStore.allTasks;
  
  currentTeamId: string | null = null;
  currentTeamName: string = '';

  constructor() {
    // טעינת כל המשימות כדי לספור אותן
    this.taskService.getTasks();
    
    // קריאת teamId מה-route
    this.route.params.subscribe(params => {
      this.currentTeamId = params['teamId'] || null;
      
      if (this.currentTeamId) {
        // אם יש teamId - מציג פרויקטים של team
        const team = this.teamStore.allTeams().find(t => t.id === this.currentTeamId);
        this.currentTeamName = team?.name || 'Team';
        this.loadTeamProjects(this.currentTeamId);
      } else {
        // אם אין teamId - מציג את כל הפרויקטים
        this.loadProjects();
      }
    });
  }

  async loadProjects() {
    await this.projectsService.getProjects();
  }

  async loadTeamProjects(teamId: string) {
    await this.projectsService.getProjectsByTeam(teamId);
  }

  getPageTitle(): string {
    return this.currentTeamId ? `${this.currentTeamName} - Projects` : 'My Projects';
  }

  showAllProjects() {
    this.router.navigate(['/projects']);
  }

  onAddProject() {
    const dialogRef = this.popup.open(CreateProjectModal, {
      width: '500px',
      data: this.currentTeamId ? { teamId: this.currentTeamId } : undefined
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          await this.projectsService.createProject(
            result.teamId,
            result.name,
            result.description
          );
          // רענון הפרויקטים
          if (this.currentTeamId) {
            this.loadTeamProjects(this.currentTeamId);
          } else {
            this.loadProjects();
          }
        } catch (error) {
          console.error('Failed to create project:', error);
        }
      }
    });
  }  onProjectClick(project: Project) {
    const dialogRef = this.popup.open(ProjectDetailsDialog, {
      width: '400px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'view-tasks') {
        this.onViewTasks(project);
      }
    });
  }

  onViewTasks(project: Project) {
    this.router.navigate(['/task/project', project.id]);
  }

  // openProjectDetailsDialog removed as we access dialog directly in onProjectClick


  getTaskCount(projectId: string | undefined): number {
    if (!projectId) return 0;
    const count = this.allTasks().filter(task => {
      const taskProjectId = task.projectId || (task as any).project_id;
      return taskProjectId === projectId || taskProjectId == projectId;
    }).length;
    return count;
  }
}
