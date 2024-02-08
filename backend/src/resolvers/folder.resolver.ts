import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import FolderService from '../services/folder.service';
import Folder , {UpdateFolderInput, CreateFolderInput} from '../entities/folder.entity';

@Resolver()
export default class FolderResolver {
	@Query(() => [Folder])
	async folders() {
		return await new FolderService().getAllFolders();
	}

	@Query(() => [Folder])
	async folderById(@Arg('id') id: string) {
		return await new FolderService().getAllFolders();
	}

	@Mutation(() => Folder)
	async updateFolder(@Arg('folder') folder: UpdateFolderInput) {
		return await new FolderService().updateFolder(folder);
	}

    @Mutation(() => Folder)
	async insertFolder(@Arg('folder') folder: CreateFolderInput) {
		return await new FolderService().insertFolder(folder);
	}

    @Mutation(() => Folder)
	async deleteFolder(@Arg('id') id: number) {
		const folderDeleted = await new FolderService().deleteFolder(id);
		return folderDeleted;
	}
}
