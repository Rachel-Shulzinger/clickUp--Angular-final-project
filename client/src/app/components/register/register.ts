import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../state/auth/auth.store';
import { AuthService } from '../../services/auth/auth-service';
import { User } from '../../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    LogoComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Inject Auth Store & Service
  authStore = inject(AuthStore);
  authService = inject(AuthService);

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value;
      await this.authService.register(userData);
    }
  }
}
