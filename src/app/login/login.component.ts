import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private userService: UserService,
    private router: Router) { }

  // Function to log in user
  loginUser(): void {
    if (!this.email || !this.password) {
      this.loginError = 'Please enter both email and password.';
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (user: Users) => {
        console.log('Logged in user:', user);
        this.router.navigate(['/employee-list']);
      },
      (error) => {
        console.error('Login error:', error);
        this.loginError = 'Invalid email or password.';
      }
    );
  }

  // Function to navigate to signup page
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

}
