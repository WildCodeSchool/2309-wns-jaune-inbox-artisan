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

export const PRINT_TEMPLATE = gql`
	query sendMail($id: Float!) {
		sendMail(id: $id) {
			html
		}
	}
`
