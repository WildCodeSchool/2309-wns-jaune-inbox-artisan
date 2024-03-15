import { gql } from '@apollo/client';

export const REGISTER = gql`
	query templates($id: Float!) {
		templates(id: $id) {
			id
			name
		}
	}
`;
