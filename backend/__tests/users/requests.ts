export const LIST_USERS = `#graphql
    query Users {
        users {
            id
            pseudo
            email
        }
    }
`;

export const CREATE_USER = `#graphql
    mutation InsertUser($user: CreateUserInput!)  {
        insertUser (user: $user)  {
            id
            email
            password
            role
            billing_date
            pseudo
        }
    }
`;

export const UPDATE_USER = `#graphql
    mutation UpdateUser($user: UpdateUserInput!)  {
        updateUser (user: $user)  {
            email
            pseudo
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