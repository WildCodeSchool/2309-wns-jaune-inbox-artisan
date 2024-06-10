import { gql } from '@apollo/client';

export const DELETE_IMAGE = gql`
	mutation DeleteImage($id: Float!) {
		deleteImage(id: $id)
	}
`;

export const INSERT_IMAGE = gql`
	mutation InsertImage($image: CreateImageInput!) {
		insertImage(image: $image)
	}
`;

export const UPDATE_IMAGE = gql`
	mutation UpdateImage($image: UpdateImageInput!) {
		updateImage(image: $image)
	}
`;
