import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Variable, { CreateVariableInput, UpdateVariableInput } from '../entities/variable.entity';



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

	async updateVariable(variable: UpdateVariableInput) {
		return this.db.update(variable.id, variable);
	}

	async insertVariable(variable: CreateVariableInput) {
		const newVariable = this.db.create(variable);
		return await this.db.save(newVariable);
	}

	async insertVariables(variables: CreateVariableInput[]) {
		variables.map((variable) => {
			console.log("-------------------------------------------------------SERVICE---------------------------------------");
			// console.log(variable.id);
			// console.log(variable.label);
			// console.log(variable.value);
			if(variable.id) {
				return this.updateVariable(variable as UpdateVariableInput);
			}
			return this.insertVariable(variable);
		});
		return true;
	}

	async deleteVariable(id: number) {
		return this.db.delete(id);
	}

	async deleteVariables(ids: number[]) {
		return this.db.delete(ids);
	}
}
