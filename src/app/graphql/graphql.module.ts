import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

// GraphQL API endpoint URI
const uri = 'http://localhost:4000/graphql'; 

// Factory function to create Apollo client options
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    // Configure the HTTP link with the GraphQL API endpoint URI
    link: httpLink.create({ uri }),
     // Initialize an in-memory cache for caching GraphQL query result
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      // Provide APOLLO_OPTIONS token to inject Apollo client options
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
