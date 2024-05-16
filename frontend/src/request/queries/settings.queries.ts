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
