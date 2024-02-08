import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import VariableService from '../services/variable.service';
import Variable, {CreateVariableInput, UpdateVariableInput} from '../entities/variable.entity';

@Resolver()
export default class VariableResolver {
    @Query(() => [Variable])
    async variables() {
        return await new VariableService().getAllVariables();
    }

    @Query(() => Variable)
    async variableById(@Arg('id') id: number) {
        return await new VariableService().getVariableById(id)
    }

    @Mutation(() => Variable)
	async updateVariable(@Arg('variable') variable: UpdateVariableInput) {
		return await new VariableService().updateVariable(variable);
	}

    @Mutation(() => Variable)
	async insertVariable(@Arg('variable') variable: CreateVariableInput) {
		return await new VariableService().insertVariable(variable);
	}

    @Mutation(() => Variable)
	async deleteVariable(@Arg('id') id: number) {
		const variableDeleted = await new VariableService().deleteVariable(id);
		return variableDeleted;
	}
}