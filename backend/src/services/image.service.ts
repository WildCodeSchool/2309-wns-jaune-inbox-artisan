import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Image, {
	CreateImageInput,
	UpdateImageInput,
} from '../entities/image.entity';
import UserService from './user.service';
import Folder from '../entities/folder.entity';
import FolderService from './folder.service';

export default class ImageService {
	db: Repository<Image>;
	constructor() {
		this.db = datasource.getRepository(Image);
	}

	async getAllImages() {
		return this.db.find();
	}

	async getImageById(id: number) {
		return this.db.findOneBy({
			id: id,
		});
	}

	async getImageByUserId(id: number) {
		const user = await new UserService().getUserById(id);
		const images = await this.db.findBy({
			user: user,
		});

		return images;
	}

	async getImageByFolderId(folder: Folder) {
		return await this.db.findBy({ folder: { id: folder.id } });
	}

	async updateImage(image: UpdateImageInput) {
		if (image.id) return this.db.update(image.id, image);
	}

	async insertImage(image: CreateImageInput) {
		const user = await new UserService().getUserById(image.userId);
		const folder = await new FolderService().getFolderById(image.folderId);

		if (!folder) new Error('No folder found');
		else return this.db.insert({ ...image, user, folder });
	}

	async deleteImage(id: number) {
		return this.db.delete(id);
	}

	async deleteImages(ids: number[]) {
		return this.db.delete(ids);
	}
}
