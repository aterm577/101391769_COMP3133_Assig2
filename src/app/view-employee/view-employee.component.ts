import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloError } from 'apollo-client';
import { Router } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee | undefined;
  loading = false;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // Extract employeeId from the route parameters
    const employeeId = this.route.snapshot.paramMap.get('employeeId');

    // Fetch employee details by employeeId using the EmployeeService
    if (employeeId) {
      this.loading = true;
      this.employeeService.getEmployeeById(employeeId).subscribe(
        (employee) => {
          this.employee = employee;
          this.loading = false;
        },
        (error: ApolloError) => {
          console.error('Error fetching employee:', error);
          this.error = 'Failed to fetch employee details';
          this.loading = false;
        }
      );
    }
  }

  // Navigate back to the previous page (employee-list)
  goBack(): void {
    this.router.navigate(['/employee-list']);
  }
}
