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

    @Mutation(() => Boolean)
	async insertVariables(@Arg('variables', type => [CreateVariableInput]) variables: CreateVariableInput[]) {
        console.log("---------------------------------------------------------RESOLVER-------------------------------------");
        // console.log(variables);
        // console.log(variables[0].id);
        // console.log(variables[0].label);
        // console.log(variables[0].value);
        const newVariables = await new VariableService().insertVariables(variables);
		return newVariables;
	}

    @Mutation(() => Variable)
	async deleteVariable(@Arg('id') id: number) {
		const variableDeleted = await new VariableService().deleteVariable(id);
		return variableDeleted;
	}
}