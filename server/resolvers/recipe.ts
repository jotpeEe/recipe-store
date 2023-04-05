import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import {
    CuisineResponse,
    Input,
    ListResponse,
    PopulatedResponse,
    Response,
    UpdateInput,
} from '@schemas/recipe';
import RecipeService from '@services/recipe';
import { type Context } from 'server/types/context';

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
    async getRecipe(@Arg('id') id: string) {
        return this.recipeService.getRecipe(id);
    }

    @Query(() => PopulatedResponse, { nullable: true })
    async getTempRecipe(@Ctx() ctx: Context) {
        return this.recipeService.getTempRecipe(ctx);
    }

    @Query(() => CuisineResponse)
    async getCuisines() {
        return this.recipeService.getCuisines();
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

    @Mutation(() => PopulatedResponse)
    async deleteRecipe(@Arg('id') id: string, @Ctx() ctx: Context) {
        return this.recipeService.deleteRecipe(id, ctx);
    }
}
