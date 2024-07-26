import { gql } from '@apollo/client';

export const GETFOLDERSBYUSERID = gql`
	query FolderByUserId($id: Float!) {
		folderByUserId(id: $id) {
			id
			name
			images {
				id
				name
				url
			}
		}
	}
`;
