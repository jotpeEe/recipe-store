import { ValidationError } from 'apollo-server-micro';

import errorHandler from '@controllers';
import { type Recipe, RecipeModel } from '@models';
import { type Input } from '@schemas/recipe';
import { type Context } from 'server/types/context';

export default class RecipeService {
    createRecipe = async (
        input: Partial<Input>,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);
            const recipe = await RecipeModel.create({
                ...input,
                user: user?._id,
            });
            return {
                status: 'success',
                recipe: {
                    ...recipe.toJSON(),
                    id: recipe?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                recipe: undefined,
            };
        }
    };

    getTempRecipe = async ({
        req,
        res,
        deserializeUser,
    }: Context): Promise<{
        recipe: Recipe | undefined;
        status: 'error' | 'success';
    }> => {
        try {
            const user = await deserializeUser(req, res);

            const recipeQuery = RecipeModel.findOne({
                user: user?._id,
                temp: true,
            }).populate('user');

            const response = await recipeQuery.lean();
            const recipe = response || undefined;

            return { status: 'success', recipe };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                recipe: undefined,
            };
        }
    };

    getRecipeById = async (id: string) => {
        try {
            const recipe = await RecipeModel.findById(id)
                .populate('user')
                .lean();

            if (!recipe)
                return new ValidationError('No recipe with that id exists');

            return {
                status: 'success',
                recipe: {
                    ...recipe,
                    id: recipe?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                recipe: undefined,
            };
        }
    };

    updateRecipe = async (
        id: string,
        input: Partial<Input>,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);
            const recipe = await RecipeModel.findByIdAndUpdate(
                id,
                { ...input, user: user?._id },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            if (!recipe)
                return new ValidationError('No recipe with that id exists');

            return {
                status: 'success',
                recipe: {
                    ...recipe,
                    id: recipe?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                recipe: undefined,
            };
        }
    };

    getCuisines = async () => {
        try {
            const cuisineQuery = RecipeModel.distinct('cuisine');

            const cuisines = await cuisineQuery.lean();

            return {
                status: 'success',
                results: cuisines.length,
                cuisines,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: 0,
                cuisines: [],
            };
        }
    };

    getAllRecipes = async () => {
        try {
            const recipesQuery = RecipeModel.find({
                temp: false,
            }).populate('user');

            const recipes = await recipesQuery.sort({ createdAt: -1 }).lean();

            return {
                status: 'success',
                results: recipes.length,
                recipes,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: 0,
                recipes: [],
            };
        }
    };

    getRecipes = async ({ req, res, deserializeUser }: Context) => {
        try {
            const user = await deserializeUser(req, res);
            const recipes = await RecipeModel.find({
                user: user?._id,
                temp: false,
            })
                .populate('user')
                .sort({ createdAt: -1 })
                .lean();

            return {
                status: 'success',
                results: recipes.length,
                recipes,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: 0,
                recipes: [],
            };
        }
    };

    deleteRecipe = async (
        id: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            await deserializeUser(req, res);
            const recipe = await RecipeModel.findByIdAndDelete(id);

            if (!recipe)
                return new ValidationError('No recipe with that id exists');

            return { status: 'success' };
        } catch (error: any) {
            errorHandler(error);
            return { status: 'error' };
        }
    };
}
