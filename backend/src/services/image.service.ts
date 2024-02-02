import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Image from '../entities/image.entity';

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

	async updateImage(image: Partial<Image>) {
		if (image.id) return this.db.update(image.id, image);
	}

	async insertImage(image: Image) {
		return this.db.insert(image);
	}

	async deleteImage(id: number) {
		return this.db.delete(id);
	}

	async deleteImages(ids: number[]) {
		return this.db.delete(ids);
	}
}
