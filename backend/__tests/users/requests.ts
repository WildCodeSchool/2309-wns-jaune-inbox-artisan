export const LIST_USERS = `#graphql
    query Users {
        users {
            id
            username
            mail
        }
    }
`;

export const CREATE_USER = `#graphql
    mutation CreateUser($user: CreateUserInput!)  {
        createUser (user: $user)  {
            id
            mail
            password
            role
            billing_date
            username
        }
    }
`;

export const UPDATE_USER = `#graphql
    mutation UpdateUser($user: UpdateUserInput!)  {
        updateUser (user: $user)  {
            mail
            username
        }
    }
`;

export const DELETE_USER = `#graphql
    mutation DeleteUser($deleteUserId: Float!)  {
        deleteUser (id: $deleteUserId)  {
            id
        }
    }
`;
