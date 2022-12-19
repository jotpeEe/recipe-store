import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import {
    Input,
    ListResponse,
    PopulatedResponse,
    Response,
    UpdateInput,
} from '@schemas/recipe';
import RecipeService from '@services/recipe';
import type { Context } from 'server/types/context';

@Resolver()
export default class RecipeResolver {
    constructor(private recipeService: RecipeService) {
        this.recipeService = new RecipeService();
    }

    @Mutation(() => Response)
    async createRecipe(@Arg('input') input: Input, @Ctx() ctx: Context) {
        return this.recipeService.createRecipe(input, ctx);
    }

    @Query(() => PopulatedResponse)
    async getRecipe(@Arg('id') id: string, @Ctx() ctx: Context) {
        return this.recipeService.getRecipe(id, ctx);
    }

    @Mutation(() => Response)
    async updateRecipe(
        @Arg('id') id: string,
        @Arg('input') input: UpdateInput,
        @Ctx() ctx: Context
    ) {
        return this.recipeService.updateRecipe(id, input, ctx);
    }

    @Query(() => ListResponse)
    async getAllRecipes() {
        return this.recipeService.getAllRecipes();
    }

    @Query(() => ListResponse)
    async getRecipes(@Ctx() ctx: Context) {
        return this.recipeService.getRecipes(ctx);
    }

    @Mutation(() => Boolean)
    async deleteRecipe(@Arg('id') id: string, @Ctx() ctx: Context) {
        return this.recipeService.deleteRecipe(id, ctx);
    }
}
