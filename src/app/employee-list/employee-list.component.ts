import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = []; // Array to hold the list of employees

  constructor(
    private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }
  
  // Function to fetch all employees from the service
  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  // Function to navigate to view employee details page
  viewEmployee(employeeId: string): void {
    console.log('View employee:', employeeId);
    this.router.navigate(['/view-employee', employeeId]);
  }

  // Function to navigate to update employee details page
  updateEmployee(employeeId: string): void {
    console.log('Update employee:', employeeId);
    this.router.navigate(['/update-employee', employeeId]);
  }

  // Function to delete an employee
  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response) => {
        console.log('Employee deleted:', response);
        // Remove the deleted employee from the list
        this.employees = this.employees.filter(emp => emp._id !== employeeId);
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  // Function to navigate to add employee page
  redirectToAddEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  // Function to navigate to login page (logout action)
  logout(): void {
    this.router.navigate(['/login']);
  }
}