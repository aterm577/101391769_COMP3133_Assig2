import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})

export class UpdateEmployeeComponent implements OnInit {
  employeeId!: string;
  employee: Employee | undefined;
  updateForm: FormGroup;
  loading = false;

  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    // Initialize the updateForm with form controls and validators
    this.updateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Retrieve employeeId from route parameters and fetch employee details
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.fetchEmployeeDetails();
  }

  // Fetch employee details using the employeeService based on employeeId
  fetchEmployeeDetails(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee) => {
        this.employee = employee;
        this.updateForm.patchValue({
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          gender: employee.gender,
          salary: employee.salary
        });
      },
      (error) => {
        console.error('Error fetching employee details:', error);
        this.error = 'Failed to fetch employee details';
      }
    );
  }

  // Handle form submission to update employee details
  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    const updatedEmployee = this.updateForm.value;
    
    // Call employeeService to update employee details
    this.employeeService.updateEmployeeById(this.employeeId, updatedEmployee).subscribe(
      (updatedEmployee) => {
        console.log('Employee updated successfully:', updatedEmployee);
        this.successMessage = 'Employee updated successfully!';
      },
      (error) => {
        console.error('Error updating employee:', error);
        this.error = 'Failed to update employee';
        this.loading = false;
      }
    );
  }

  // Function to navigate back to the employee list
  navigateToEmployeeList(): void {
    this.router.navigate(['/employee-list']);
  }
}

  
