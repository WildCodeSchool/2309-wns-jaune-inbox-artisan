import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import TemplateService from '../services/template.service';
import Template, {CreateTemplateInput, UpdateTemplateInput} from '../entities/template.entity';

@Resolver()
export default class TemplateResolver {
    @Query(() => [Template])
    async templates() {
        return await new TemplateService().getAllTemplates();
    }

    @Query(() => Template)
    async templateById(@Arg('id') id: number) {
        return await new TemplateService().getTemplateById(id)
    }

    @Mutation(() => Template)
	async updateTemplate(@Arg('user') user: UpdateTemplateInput) {
		return await new TemplateService().updateTemplate(user);
	}

    @Mutation(() => Template)
	async insertTemplate(@Arg('template') template: CreateTemplateInput) {
		return await new TemplateService().insertTemplate(template);
	}

    @Mutation(() => Template)
	async deleteTemplate(@Arg('id') id: number) {
		const templateDeleted = await new TemplateService().deleteTemplate(id);
		return templateDeleted;
	}
}