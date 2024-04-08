import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  username: string = '';
  email: string = '';
  password: string = '';
  signupError: string = '';

  constructor(
    private userService: UserService,
    private router: Router) {}

  // Function to handle form submission
  onSubmit(): void {

    if (!this.username || !this.email || !this.password) {
      this.signupError = 'Please fill in all fields.';
      return;
    }
    
    // Prepare user data object from form inputs
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.userService.signup(userData).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/employee-list']);
      },
      (error) => {
        console.error('Signup failed:', error);
        this.signupError = 'A user is already registered with the email!'
      }
    );
  }

  // Function to navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}

