import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TeamStore } from '../../state/team/team.store';
import { Team } from '../../models/team.model';

interface TeamDto {
  id: string;
  name: string;
  description: string;
  members_count: number;
  members: string[]; // Assuming array of IDs or names
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private readonly httpClient = inject(HttpClient);
  private readonly teamStore = inject(TeamStore);
  private readonly router = inject(Router);

  async getTeams(): Promise<void> {
   this.teamStore.setLoading(true);

    try{
      const teams = await firstValueFrom(
        this.httpClient.get<TeamDto[]>(`/teams`)
      );
      
      // Convert snake_case to camelCase
      const mappedTeams = teams.map(team => ({
        id: team.id,
        name: team.name,
        description: team.description,
        memberCount: team.members_count,
        members: team.members,
        createdAt: team.created_at ? new Date(team.created_at) : undefined
      }));
      
      this.teamStore.setTeamsSucsess(mappedTeams);
    }catch(error){
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to load teams';
      this.teamStore.setTeamsFailure(errorMessage);
    }
  }

  async createTeam(name: string): Promise<void> {
    this.teamStore.setLoading(true);
    try {
      await firstValueFrom(
        this.httpClient.post<any>(`/teams`, { name })
      );
      this.getTeams();
      this.router.navigate([`/teams`]);
    } 
    catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to create team';
      this.teamStore.setTeamsFailure(errorMessage);
    }
  }

  async addMemberToTeam(teamId:string,userId:string): Promise<void> {
    this.teamStore.setLoading(true);
    try{
      await firstValueFrom(
        this.httpClient.post(`/teams/${teamId}/members`, {userId})
      );
      this.getTeams();
      this.router.navigate([`/teams/${teamId}`]);

    }catch(error){
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to add member to team';
      this.teamStore.setTeamsFailure(errorMessage);
    }
    
  }

  async deleteTeam(teamId:string): Promise<void> {
    this.teamStore.setLoading(true);
    try{
      await firstValueFrom(
        this.httpClient.delete(`/teams/${teamId}`)
      );
      this.getTeams();
      this.router.navigate([`/teams`]);
    }catch(error){
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to delete team';
      this.teamStore.setTeamsFailure(errorMessage);
    }
  }


}