import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { TeamsService } from '../../services/teams/teams-service';
import { TeamStore } from '../../state/team/team.store';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateTeam } from '../create-team-modal/create-team-modal';
import { ConfirmPopup } from '../confirm-popup/confirm-popup';
import { AddMemberPopup } from '../add-member-popup/add-member-popup';
import { UsersService } from '../../services/users/users';
import { UserStore } from '../../state/users/users.store';
import { PrjectsService } from '../../services/projects/prjects-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-teams',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})

export class Teams {

  private popup = inject(MatDialog);
  private authService = inject(AuthService);
  private router = inject(Router);
  teamsService = inject(TeamsService);
  usersService = inject(UsersService);
  projectsService = inject(PrjectsService);
  userStore = inject(UserStore);
  teamStore = inject(TeamStore);
  teams = this.teamStore.allTeams;

  constructor() {
    this.teamsService.getTeams();
    this.usersService.getUsers();
  }

  onCreateTeam() {
    const dialogRef = this.popup.open(CreateTeam, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.teamsService.createTeam(result);
      }
    });
  }

  onDeleteTeam(teamId: string) {

    const dialogRef = this.popup.open(ConfirmPopup, {
      width: '350px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this team?',
        confirmText: 'Delete',
        color: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.teamsService.deleteTeam(teamId);
      }
    });
  }

  onAddmember(teamId: string) {

    const users = this.userStore.allUsers();
    const userOptions = users.map(user => ({
      id: user.id,
      label: user.name
    }));

    this.popup.open(AddMemberPopup, {
      width: '350px',
      data: {
        title: 'Add New Member',
        options: userOptions,
        placeholder: 'Search for a user',
        confirmText: 'Add to Team'
      }
    }).afterClosed().subscribe(selectedUserId => {
      if (selectedUserId) {
        this.teamsService.addMemberToTeam(teamId, selectedUserId);

      }
    });
  }

  async showTeamProjects(teamId: string) {
    // ניווט לעמוד Projects עם סינון לפי team
    this.router.navigate(['/projects/team', teamId]);
  }

  getMemberCount(team: Team): number {
    // ספירת חברים
    if (team.members && Array.isArray(team.members)) {
      return team.members.length;
    }
    // אם יש memberCount
    if (team.memberCount !== undefined) {
      return team.memberCount;
    }
    return 0;
  }

  onLogout(): void {
    this.authService.logout();
  }
}











