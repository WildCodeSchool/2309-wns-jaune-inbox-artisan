import { Query, Resolver } from 'type-graphql';
import ImageService from '../services/image.service';
import Image from '../entities/image.entity';

@Resolver()
export default class ImageResolver {
	@Query(() => [Image])
	async folders() {
		return await new ImageService().getAllImages();
	}
}
