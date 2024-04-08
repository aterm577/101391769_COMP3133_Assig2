import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { gql } from 'apollo-angular';
import { ApolloError } from '@apollo/client';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo,) { }

  // Query to fetch all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.apollo
      .watchQuery<any>({
      query: gql`
        query {
          getAllEmployees {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `
    }).valueChanges.pipe(
      map((result) => result.data.getAllEmployees)
    );
  }

 // Method to get employee by ID
 getEmployeeById(employeeId: string): Observable<Employee> {
  return this.apollo
    .watchQuery<any>({
      query: gql`
        query GetEmployeeById($employeeId: ID!) {
          getEmployeeById(_id: $employeeId) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        employeeId
      }
    }).valueChanges.pipe(
      map((result) => result.data.getEmployeeById as Employee),
      catchError((error: ApolloError) => {
        console.error('Error fetching employee:', error);
        let errorMessage = 'Failed to fetch employee details';
        if (error.networkError) {
          errorMessage = 'Network error occurred, please try again';
        }
        return throwError(errorMessage);
      })
    );
}

  // Method to add a new employee
  addEmployee(employeeInput: any): Observable<Employee> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation AddEmployee($employeeInput: EmployeeInfo!) {
          addNewEmployee(employeeInput: $employeeInput) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        employeeInput
      }
    }).pipe(
      map((result: MutationResult<any>) => {
        if (result.data) {
          return result.data.addNewEmployee as Employee;
        } else {
          throw new Error('Failed to add employee');
        }
      })
    );
  }

  // Method to update employee by ID
  updateEmployeeById(employeeId: string, updatedEmployee: any): Observable<Employee> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation UpdateEmployee($employeeId: ID!, $updatedEmployee: EmployeeInfo!) {
          updateEmployeeById(_id: $employeeId, employeeInput: $updatedEmployee) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        employeeId,
        updatedEmployee
      }
    }).pipe(
      map((result: MutationResult<any>) => {
        if (result.data) {
          return result.data.updateEmployeeById as Employee;
        } else {
          throw new Error('Failed to update employee');
        }
      }),
      catchError((error) => {
        console.error('Error updating employee:', error);
        return throwError('Failed to update employee');
      })
    );
  }

   // Delete Employee by ID
  deleteEmployee(employeeId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($employeeId: ID!) {
          deleteEmployeeById(_id: $employeeId) {
            _id
          }
        }
      `,
      variables: {
        employeeId
      }
    });
  }
}
