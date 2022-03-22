import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery(ME_QUERY);
};