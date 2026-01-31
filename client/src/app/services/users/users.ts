import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../state/users/users.store';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { firstValueFrom } from 'rxjs';

interface UserDto {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private readonly httpClient = inject(HttpClient);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  async getUsers(): Promise<void> {
    this.userStore.setLoading(true);
    try {
      const users = await firstValueFrom(
        this.httpClient.get<UserDto[]>(`/users`)
      );
      
      const mappedUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        createdAt: u.created_at ? new Date(u.created_at) : undefined
      }));

      this.userStore.setUsersSuccess(mappedUsers);
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to load users';
      this.userStore.setUsersFailure(errorMessage);
    }
  }
}
