import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Folder, {
	CreateFolderInput,
	UpdateFolderInput,
} from '../entities/folder.entity';
import UserService from './user.service';

export default class FolderService {
	db: Repository<Folder>;
	constructor() {
		this.db = datasource.getRepository(Folder);
	}

	async getAllFolders() {
		return this.db.find();
	}

	async getFolderById(id: number) {
		return this.db.findOneBy({ id });
	}

	async getFolderByUserId(id: number) {
		const user = await new UserService().getUserById(id);

		const folder = await this.db.find({
			where: { user: { id: user.id } },
			relations: { images: true },
		});

		return folder;
	}

	async updateFolder(folder: UpdateFolderInput) {
		if (folder.id) return this.db.update(folder.id, folder);
	}

	async insertFolder(folder: CreateFolderInput) {
		const user = await new UserService().getUserById(folder.userId);

		return this.db.insert({ ...folder, user });
	}

	async deleteFolder(id: number) {
		return this.db.delete(id);
	}

	async deleteFolders(ids: number[]) {
		return this.db.delete(ids);
	}
}
