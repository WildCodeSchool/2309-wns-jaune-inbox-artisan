import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Variable, {
	CreateVariableInput,
	UpdateVariableInput,
} from '../entities/variable.entity';

export default class ImageService {
	db: Repository<Variable>;
	constructor() {
		this.db = datasource.getRepository(Variable);
	}

	async getAllVariables() {
		return this.db.find();
	}

	// async getVariableByUserId() {
	// 	// const user =
	// 	return this.db.find({ where: { user } });
	// }

	async getVariableById(id: number) {
		return this.db.findOneBy({
			id: id,
		});
	}

	async updateVariable(variable: UpdateVariableInput) {
		return this.db.update(variable.id, variable);
	}

	async insertVariable(variable: CreateVariableInput) {
		const newVariable = this.db.create(variable);
		return await this.db.save(newVariable);
	}

	async deleteVariables(ids: number[]) {
		return this.db.delete(ids);
	}
}
