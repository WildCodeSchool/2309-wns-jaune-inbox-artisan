export type ImageType = {
	id?: number;
	name: string;
	url: string;
};

export type FolderType = {
	id?: number;
	name: string;
	images: ImageType[];
};
