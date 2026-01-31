import { inject, Injectable } from '@angular/core';
import { ProjectStore } from '../../state/project/project.store';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Project } from '../../models/project.model';

interface ProjectDto {
  id: string;
  name: string;
  description: string;
  team_id: string;
  owner: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})

export class PrjectsService {
  private readonly httpClient = inject(HttpClient);
  private readonly projectStore = inject(ProjectStore);
  private readonly router = inject(Router);

  async getProjects(): Promise<void> {
   this.projectStore.setLoading(true);
    try{
      const projects = await firstValueFrom(
        this.httpClient.get<ProjectDto[]>(`/projects`)
      );
      
      // Convert snake_case to camelCase
      const mappedProjects = projects.map(project => ({
        id: project.id,
        name: project.name,
        description: project.description,
        teamId: project.team_id,
        owner: project.owner,
        createdAt: project.created_at ? new Date(project.created_at) : undefined,
        updatedAt: project.updated_at ? new Date(project.updated_at) : undefined
      }));
      
      this.projectStore.setProjectsSuccess(mappedProjects);
      // this.router.navigate([`/projects`]);  
    }catch(error){
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to load projects';
      this.projectStore.setProjectsFailure(errorMessage);
    }
  }

  async createProject(teamId:string, name:string, description?:string): Promise<void> {
    this.projectStore.setLoading(true);
    
    try {
      await firstValueFrom(
        this.httpClient.post<ProjectDto>(`/projects`, {teamId, name, description})
      );
      
      // רענון הפרויקטים אחרי יצירה
      await this.getProjects();
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.error || errorBody?.message || 'Failed to create project';
      this.projectStore.setProjectsFailure(errorMessage);
      throw error;
    }
  }

  async getProjectsByTeam(teamId: string): Promise<Project[]> {
    this.projectStore.setLoading(true);
    try {
      const projects = await firstValueFrom(
        this.httpClient.get<ProjectDto[]>(`/projects`)
      );
      
      // Convert snake_case to camelCase and filter by teamId
      const mappedProjects = projects.map(project => ({
        id: project.id,
        name: project.name,
        description: project.description,
        teamId: project.team_id,
        owner: project.owner,
        createdAt: project.created_at ? new Date(project.created_at) : undefined,
        updatedAt: project.updated_at ? new Date(project.updated_at) : undefined
      }));
      
      const teamProjects = mappedProjects.filter(p => p.teamId == teamId);
      
      this.projectStore.setProjectsSuccess(teamProjects);
      return teamProjects;
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to load projects';
      this.projectStore.setProjectsFailure(errorMessage);
      return [];
    }
  }
  
}
