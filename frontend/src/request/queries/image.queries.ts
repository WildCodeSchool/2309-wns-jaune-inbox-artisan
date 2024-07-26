import { gql } from '@apollo/client';

export const GetImagesByUserId = gql`
	query imageByUserId($id: Float!) {
		imageByUserId(id: $id) {
			id
			name
			url
			folder
		}
	}
`;

export const GetImagesByFolderId = gql`
	query ImageByFolderId($id: Float!) {
		imageByFolderId(id: $id) {
			id
			name
			url
		}
	}
`;
