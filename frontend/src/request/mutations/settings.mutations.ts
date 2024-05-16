import { gql } from "@apollo/client";

export const INSERT_VARIABLES = gql`
  mutation InsertVariables($variables: [CreateVariableInput!]!) {
    insertVariables(variables: $variables)
}
`;