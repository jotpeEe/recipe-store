import { ValidationError } from 'apollo-server-micro';

import errorHandler from '@controllers/error';
import RecipeModel from '@models/recipe';
import Input from '@schemas/recipe/input';
import { Context } from 'server/types/context';

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
                status: 'failure',
                recipe: undefined,
            };
        }
    };

    getRecipe = async (id: string, { req, res, deserializeUser }: Context) => {
        try {
            await deserializeUser(req, res);
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
                status: 'failure',
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
                status: 'failure',
                recipe: undefined,
            };
        }
    };

    getAllRecipes = async () => {
        try {
            const recipesQuery = RecipeModel.find().populate('user');

            const recipes = await recipesQuery.sort({ createdAt: -1 }).lean();

            return {
                status: 'success',
                results: recipes.length,
                recipes,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'failure',
                results: 0,
                recipes: [],
            };
        }
    };

    getRecipes = async ({ req, res, deserializeUser }: Context) => {
        try {
            const user = await deserializeUser(req, res);
            const recipeQuery = RecipeModel.find({ user: user?._id }).populate(
                'user'
            );

            const recipes = await recipeQuery.sort({ createdAt: -1 }).lean();
            return {
                status: 'success',
                results: recipes.length,
                recipes,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'failure',
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
                return new ValidationError('No post with that id exists');

            return true;
        } catch (error: any) {
            errorHandler(error);
            return false;
        }
    };
}
