import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Template, { CreateTemplateInput } from '../entities/template.entity';

export default class TemplateService {
	db: Repository<Template>;
	constructor() {
		this.db = datasource.getRepository(Template);
	}

	async getAllTemplates() {
		return this.db.find();
	}

	async getTemplateById(id: number) {
		return this.db.findOneBy({
			id: id,
		});
	}

	async updateTemplate(template: Partial<Template>) {
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
