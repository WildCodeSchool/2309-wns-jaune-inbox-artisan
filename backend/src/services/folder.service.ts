import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Folder, {CreateFolderInput, UpdateFolderInput} from '../entities/folder.entity';

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

	async updateFolder(folder: UpdateFolderInput) {
		if (folder.id) return this.db.update(folder.id, folder);
	}

	async insertFolder(folder: CreateFolderInput) {
		return this.db.insert(folder);
	}

	async deleteFolder(id: number) {
		return this.db.delete(id);
	}

	async deleteFolders(ids: number[]) {
		return this.db.delete(ids);
	}
}
