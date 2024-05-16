import { gql } from '@apollo/client';

export const DELETE_FOLDER = gql`
	mutation DeleteFolder($deleteFolderId: Float!) {
		deleteFolder(id: $deleteFolderId)
	}
`;

export const INSERT_FOLDER = gql`
	mutation InsertFolder($folder: CreateFolderInput!) {
		insertFolder(folder: $folder)
	}
`;

export const UPDATE_FOLDER = gql`
	mutation UpdateFolder($folder: UpdateFolderInput!) {
		updateFolder(folder: $folder)
	}
`;
