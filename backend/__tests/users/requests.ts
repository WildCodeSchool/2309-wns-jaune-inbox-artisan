export const LIST_USERS = `#graphql
    query Users {
        users {
            id
            pseudo
            email
        }
    }
`;