import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

   // Function to authenticate user login
  login(email: string, password: string): Observable<Users> {
    return this.apollo
      .query<any>({
        query: gql`
            query Login($email: String!, $password: String!) {
            login(loginInput: { email: $email, password: $password }) {
              _id
              username
              email
              token
            }
          }
        `,
        variables: {
          email,
          password
        }
      })
      .pipe(
        map(result => result.data.login as Users)
      );
  }

  // Function to register a new user
  signup(userData: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($registerInput: Register!) {
          signup(registerInput: $registerInput) {
            _id
            username
            email
            token
          }
        }
      `,
      variables: {
        registerInput: {
          username: userData.username,
          email: userData.email,
          password: userData.password
        }
      }
    });
  } 
}
