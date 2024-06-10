import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import ImageService from '../services/image.service';
import Image, {
	UpdateImageInput,
	CreateImageInput,
} from '../entities/image.entity';
import { DeleteResult } from 'typeorm';
import FolderService from '../services/folder.service';
import UserService from '../services/user.service';

@Resolver()
export default class ImageResolver {
	@Query(() => [Image])
	async images() {
		return await new ImageService().getAllImages();
	}

	@Query(() => Image)
	async imageById(@Arg('id') id: number) {
		return await new ImageService().getImageById(id);
	}

	@Query(() => [Image])
	async imageByUserId(@Arg('id') id: number) {
		return await new ImageService().getImageByUserId(id);
	}

	@Query(() => [Image])
	async imageByFolderId(@Arg('id') id: number) {
		const folder = await new FolderService().getFolderById(id);
		if (!folder) new Error('no folder found');
		else return await new ImageService().getImageByFolderId(folder);
	}

	@Mutation(() => Boolean)
	async updateImage(@Arg('image') image: UpdateImageInput) {
		const imageUpdated = await new ImageService().updateImage(image);
		if (!imageUpdated?.affected) return false;
		return true;
	}

	@Mutation(() => Boolean)
	async insertImage(@Arg('image') image: CreateImageInput) {
		const createdImage = await new ImageService().insertImage(image);
		if (!createdImage?.identifiers) return false;
		return true;
	}

	@Mutation(() => Boolean)
	async deleteImage(@Arg('id') id: number) {
		const imageDeleted = await new ImageService().deleteImage(id);
		if (!imageDeleted.affected) return false;
		return true;
	}
}
