import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Variable, { CreateVariableInput } from '../entities/variable.entity';

export default class ImageService {
	db: Repository<Variable>;
	constructor() {
		this.db = datasource.getRepository(Variable);
	}

	async getAllVariables() {
		return this.db.find();
	}

	async getVariableById(id: number) {
		return this.db.findOneBy({
			id: id,
		});
	}

	async updateVariable(variable: Partial<Variable>) {
		if (variable.id) return this.db.update(variable.id, variable);
	}

	async insertVariable(variable: CreateVariableInput) {
		return this.db.insert(variable);
	}

	async deleteVariable(id: number) {
		return this.db.delete(id);
	}

	async deleteVariables(ids: number[]) {
		return this.db.delete(ids);
	}
}
