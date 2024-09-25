import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import {
    AvailableCatResponse,
    Input,
    ListResponse,
    PopulatedResponse,
    UpdateInput,
} from '@schemas/recipe';
import RecipeService from '@services/recipe';
import { type Context } from 'server/types/context';

@Resolver()
export default class RecipeResolver {
    constructor(private recipeService: RecipeService) {
        this.recipeService = new RecipeService();
    }

    @Mutation(() => PopulatedResponse)
    async createRecipe(@Arg('input') input: Input, @Ctx() ctx: Context) {
        return this.recipeService.createRecipe(input, ctx);
    }

    @Query(() => PopulatedResponse)
    async getRecipeById(@Arg('id') id: string) {
        return this.recipeService.getRecipeById(id);
    }

    @Query(() => PopulatedResponse)
    async getTempRecipe(@Ctx() ctx: Context) {
        return this.recipeService.getTempRecipe(ctx);
    }

    @Query(() => AvailableCatResponse)
    async getAvailableCategories(@Arg('cat') cat: string) {
        return this.recipeService.getAvailableCategories(cat);
    }

    @Mutation(() => PopulatedResponse)
    async updateRecipe(
        @Arg('id') id: string,
        @Arg('input') input: UpdateInput,
        @Ctx() ctx: Context
    ) {
        return this.recipeService.updateRecipe(id, input, ctx);
    }

    @Query(() => ListResponse)
    async getAllRecipes(@Arg('limit', { nullable: true }) limit?: number) {
        return this.recipeService.getAllRecipes(limit);
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
