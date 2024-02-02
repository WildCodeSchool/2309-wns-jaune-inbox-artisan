import { Arg, Query, Resolver } from 'type-graphql';
import FolderService from '../services/folder.service';
import Folder from '../entities/folder.entity';

@Resolver()
export default class UserResolver {
	@Query(() => [Folder])
	async users() {
		return await new FolderService().getAllFolders();
	}

	@Query(() => [Folder])
	async userById(@Arg('id') id: string) {
		return await new FolderService().getAllFolders();
	}
}
