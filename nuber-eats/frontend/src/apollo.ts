import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'

import { LOCAL_STORAGE_TOKEN } from "./constants"

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)

  return {
    headers: {
      ...headers,
      'x-jwt': token || "",
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  })
})