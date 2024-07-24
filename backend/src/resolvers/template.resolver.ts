import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import TemplateService from '../services/template.service';
import Template, {
	CreateTemplateInput,
	CreateTemplateInputRequest,
	UpdateTemplateInput,
	PrintTemplate,
} from '../entities/template.entity';
import UserService from '../services/user.service';
import VariableService from '../services/variable.service';
import Variable from '../entities/variable.entity';
import Image from 'next/image';
import { MyContext } from '..';
import getMailHtml from '../utils/render';

@Resolver()
export default class TemplateResolver {
	@Query(() => [Template])
	async templates(@Arg('id') id: number) {
		const user = await new UserService().getUserById(id);
		return await new TemplateService().getAllTemplates(user);
	}

	@Query(() => Template)
	async templateById(@Arg('id') id: number, @Ctx() ctx: MyContext) {
		console.log('ctx :', ctx.user);
		if (ctx.user)
			return await new TemplateService().getTemplateById(id, ctx?.user);
	}

	@Query(() => PrintTemplate)
	async sendMail(@Arg('id') id: number, @Ctx() ctx: MyContext) {
		if (ctx.user) {
			const template = await new TemplateService().getTemplateById(
				id,
				ctx?.user
			);
			const variable = await new VariableService().getVariableByUserId(
				ctx?.user
			);
			console.log(template, variable);
			if (template && template instanceof Template) {
				const response = getMailHtml(template.config, variable);
				return { html: response };
			}
		}
	}

	@Query(() => Template)
	async templateByUserId(@Arg('userId') userId: number) {
		const user = await new UserService().getUserById(userId);
		return await new TemplateService().getTemplatesByUser(user);
	}

	@Mutation(() => Template)
	async updateTemplate(@Arg('template') template: UpdateTemplateInput) {
		await new TemplateService().updateTemplate(template);
		return { id: template.id };
	}

	@Mutation(() => Template)
	async insertTemplate(@Arg('template') template: CreateTemplateInputRequest) {
		const user = await new UserService().getUserById(template.userId);
		const newTemplate = {
			name: template.name,
			user: user,
			config: '',
			variables: [],
			Images: [],
		};
		const insertTemplate = await new TemplateService().insertTemplate(
			newTemplate
		);
		console.log(insertTemplate);
		return { id: insertTemplate.raw[0].id };
	}

	@Mutation(() => Template)
	async deleteTemplate(@Arg('id') id: number) {
		const templateDeleted = await new TemplateService().deleteTemplate(id);
		return templateDeleted;
	}
}
