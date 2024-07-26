import { gql } from '@apollo/client';

export const LIST_VARIABLES = gql`
	query Variables {
		variables {
			id
			label
			value
		}
	}
`;

export const LIST_VARIABLES_BY_USER = gql`
	query variablesByUserId($id: Float!) {
		variablesByUserId(userId: $id) {
			id
			label
			value
		}
	}
`;
