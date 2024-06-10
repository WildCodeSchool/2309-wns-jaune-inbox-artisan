import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import FolderService from '../services/folder.service';
import Folder, {
	UpdateFolderInput,
	CreateFolderInput,
} from '../entities/folder.entity';

@Resolver()
export default class FolderResolver {
	@Query(() => [Folder])
	async folders() {
		return await new FolderService().getAllFolders();
	}

	@Query(() => [Folder])
	async folderById(@Arg('id') id: number) {
		return await new FolderService().getFolderById(id);
	}

	@Query(() => [Folder])
	async folderByUserId(@Arg('id') id: number) {
		const response = await new FolderService().getFolderByUserId(id);
		return response;
	}

	@Mutation(() => Boolean)
	async updateFolder(@Arg('folder') folder: UpdateFolderInput) {
		const folderUpdated = await new FolderService().updateFolder(folder);
		if (!folderUpdated?.affected) return false;
		return true;
	}

	@Mutation(() => Boolean)
	async insertFolder(@Arg('folder') folder: CreateFolderInput) {
		const createdFolder = await new FolderService().insertFolder(folder);
		if (!createdFolder.identifiers) return false;
		return true;
	}

	@Mutation(() => Boolean)
	async deleteFolder(@Arg('id') id: number) {
		const folderDeleted = await new FolderService().deleteFolder(id);
		if (!folderDeleted.affected) return false;
		return true;
	}
}
