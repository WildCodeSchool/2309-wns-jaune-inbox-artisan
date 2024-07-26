import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import VariableService from '../services/variable.service';
import Variable, {
	CreateVariableInput,
	UpdateVariableInput,
} from '../entities/variable.entity';
import UserService from '../services/user.service';

@Resolver()
export default class VariableResolver {
	@Query(() => [Variable])
	async variables() {
		return await new VariableService().getAllVariables();
	}

	@Query(() => [Variable])
	async variablesByUserId(@Arg('userId') userId: number) {
		const user = await new UserService().getUserById(userId);

		return await new VariableService().getVariableByUserId(user);
	}

	@Query(() => Variable)
	async variableById(@Arg('id') id: number) {
		return await new VariableService().getVariableById(id);
	}

	@Mutation(() => Boolean)
	async insertVariables(
		@Arg('variables', (type) => [CreateVariableInput])
		variables: CreateVariableInput[]
	) {
		// console.log("---------------------------------------------------------RESOLVER-------------------------------------");
		const variablesInDB = await new VariableService().getAllVariables();
		// console.log("------------------------------varInDB---------------------------------------");
		// console.log(variablesInDB);
		// console.log("------------------------------varFromFront---------------------------------------");
		// console.log(variables);

		const difference = variablesInDB.filter(
			(x) => !variables.some((v) => v.id?.toString() === x.id.toString())
		);

		// console.log("------------------------------difference to delete---------------------------------------");
		// console.log(difference);

		const idsToDelete = [] as number[];
		difference?.map((varToDelete) => {
			idsToDelete.push(varToDelete.id);
		});

		if (idsToDelete.length) {
			this.deleteVariables(idsToDelete);
		}

		variables.map((variable) => {
			if (variable.id) {
				new VariableService().updateVariable(variable as UpdateVariableInput);
			} else {
				new VariableService().insertVariable(variable);
			}
		});

		return true;
	}

	@Mutation(() => [Variable])
	async deleteVariables(@Arg('ids', (type) => [Number]) ids: number[]) {
		// const variablesDeleted = await new VariableService().deleteVariables(ids);
		new VariableService().deleteVariables(ids);
		return true;
	}
}
