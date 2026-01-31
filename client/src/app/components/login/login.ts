import { Component, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../state/auth/auth.store';
import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Inject Auth Store & Service
  authStore = inject(AuthStore);
  authService = inject(AuthService);

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Effect to enable/disable form based on loading state
    effect(() => {
      if (this.authStore.authLoading()) {
        this.userForm.disable();
      } else {
        this.userForm.enable();
      }
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      await this.authService.login(email, password);
    }
  }
}
