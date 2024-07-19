import { gql } from '@apollo/client';

export const REGISTER = gql`
	query templates($id: Float!) {
		templates(id: $id) {
			id
			name
		}
	}
`;

export const GET_TEMPLATE_BY_ID = gql`
	query template($id: Float!) {
		templateById(id: $id) {
			id
			name
			config
		}
	}
`
