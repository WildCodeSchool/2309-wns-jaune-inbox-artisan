import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Template, {
	CreateTemplateInput,
	UpdateTemplateInput,
} from '../entities/template.entity';
import User from '../entities/user.entity';

export default class TemplateService {
	db: Repository<Template>;
	constructor() {
		this.db = datasource.getRepository(Template);
	}

	async getAllTemplates(user: User) {
		return this.db.find({ where: { user: user } });
	}

	async getTemplateById(id: number) {
		return this.db.findOneBy({
			id: id,
		});
	}

	async getTemplatesByUser(user: User) {
		return this.db.find({where: {
			user: user,
		}});
	}

	async updateTemplate(template: UpdateTemplateInput) {
		console.log(template.id)
		if (template.id) return this.db.update(template.id, template);
	}

	async insertTemplate(template: CreateTemplateInput) {
		return this.db.insert(template);
	}

	async deleteTemplate(id: number) {
		return this.db.delete(id);
	}

	async deleteTemplates(ids: number[]) {
		return this.db.delete(ids);
	}
}
