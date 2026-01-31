import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../state/auth/auth.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatRippleModule,
    MatToolbarModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.professional.css'
})
export class Home {
  // auth store (to detect logged-in users and show Dashboard link)
  authStore = inject(AuthStore);

  features = signal([
    {
      icon: 'speed',
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance with real-time updates and optimized workflows',
      color: '#00bcd4'
    },
    {
      icon: 'insights',
      title: 'Smart Analytics',
      description: 'AI-powered insights and predictive analytics to drive your business forward',
      color: '#9c27b0'
    },
    {
      icon: 'groups',
      title: 'Team Collaboration',
      description: 'Connect your team with advanced collaboration tools and real-time communication',
      color: '#ff5722'
    },
    {
      icon: 'security',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards',
      color: '#4caf50'
    },
    {
      icon: 'auto_awesome',
      title: 'AI Automation',
      description: 'Automate repetitive tasks with intelligent workflows and machine learning',
      color: '#ffc107'
    },
    {
      icon: 'rocket_launch',
      title: 'Rapid Deployment',
      description: 'Get started in minutes with our intuitive setup and migration tools',
      color: '#e91e63'
    }
  ]);

  stats = signal([
    { value: '500K+', label: 'Active Users', icon: 'people' },
    { value: '10M+', label: 'Tasks Completed', icon: 'task_alt' },
    { value: '99.99%', label: 'Uptime SLA', icon: 'cloud_done' },
    { value: '150+', label: 'Countries', icon: 'public' }
  ]);

  useCases = signal([
    {
      title: 'Product Teams',
      description: 'Streamline development cycles with agile workflows',
      icon: 'code',
      color: 'primary'
    },
    {
      title: 'Marketing',
      description: 'Plan campaigns and track performance metrics',
      icon: 'campaign',
      color: 'accent'
    },
    {
      title: 'Sales',
      description: 'Manage pipeline and close deals faster',
      icon: 'trending_up',
      color: 'warn'
    },
    {
      title: 'Operations',
      description: 'Optimize processes and resource allocation',
      icon: 'settings',
      color: 'primary'
    }
  ]);

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
