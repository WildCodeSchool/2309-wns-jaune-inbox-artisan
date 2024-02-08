import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import ImageService from '../services/image.service';
import Image, {UpdateImageInput,CreateImageInput } from '../entities/image.entity';

@Resolver()
export default class ImageResolver {
	@Query(() => [Image])
	async images() {
		return await new ImageService().getAllImages();
	}

	@Query(() => Image)
    async imageById(@Arg('id') id: number) {
        return await new ImageService().getImageById(id)
    }

    @Mutation(() => Image)
	async updateImage(@Arg('user') user: UpdateImageInput) {
		return await new ImageService().updateImage(user);
	}

    @Mutation(() => Image)
	async insertImage(@Arg('image') image: CreateImageInput) {
		return await new ImageService().insertImage(image);
	}

    @Mutation(() => Image)
	async deleteImage(@Arg('id') id: number) {
		const imageDeleted = await new ImageService().deleteImage(id);
		return imageDeleted;
	}
}
