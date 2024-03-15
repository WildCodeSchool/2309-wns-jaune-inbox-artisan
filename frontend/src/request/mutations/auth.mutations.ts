import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    CreateUser(user: $user) {
        mail
        username
        password
    }
  }
`;