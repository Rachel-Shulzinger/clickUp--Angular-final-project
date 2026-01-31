import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Teams } from './components/teams/teams';
import { Projects } from './components/projects/projects';
import { authGuardGuard } from './guards/auth-guard-guard';
import { Task } from './components/task/task';
import { Settings } from './components/settings/settings';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuardGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'teams', component: Teams, canActivate: [authGuardGuard] },
  { path: 'teams/:id', component: Teams, canActivate: [authGuardGuard] },
  { path: 'projects', component: Projects, canActivate: [authGuardGuard] },
  { path: 'task', component: Task, canActivate: [authGuardGuard] },
  { path: 'task/project/:projectId', component: Task, canActivate: [authGuardGuard] },
  { path: 'projects/team/:teamId', component: Projects, canActivate: [authGuardGuard] },
  { path: 'settings', component: Settings, canActivate: [authGuardGuard] },
  { path: '**', redirectTo: '' }
];