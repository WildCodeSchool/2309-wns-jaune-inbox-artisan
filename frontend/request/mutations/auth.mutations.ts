import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($infos: InputRegister!) {
    register(infos: $infos) {
        mail
        pseudo
        password
    }
  }
`;