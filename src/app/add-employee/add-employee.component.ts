import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  // Initialize employeeInput object to store form data
  employeeInput: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0
  };

  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // Function to handle form submission
  onSubmit(): void {
    this.employeeService.addEmployee(this.employeeInput).subscribe({
      next: (result) => {
        console.log('Employee added successfully:', result);

        // Reset form input fields after successful submission
        this.employeeInput = {
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          salary: 0
        },
        this.error = null;
        this.successMessage = 'Employee added successfully!';
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        this.error = 'Failed to add employee. Please try again.'; 
        this.successMessage = null;
      }
    });
  }

  // Function to navigate back to the employee list page
  navigateToEmployeeList(): void {
    this.router.navigate(['/employee-list']);
  }
}
