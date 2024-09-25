import { ValidationError } from 'apollo-server-micro';

import errorHandler from '@controllers';
import { RecipeModel, ReviewModel } from '@models';
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

    getTempRecipe = async ({ req, res, deserializeUser }: Context) => {
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
                .populate([
                    'user',
                    'ratings',
                    {
                        path: 'reviews',
                        model: 'Review',
                        populate: [
                            {
                                path: 'user',
                                model: 'User',
                            },
                            {
                                path: 'recipeAuthor',
                                model: 'User',
                            },
                        ],
                    },
                ])
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
            ).populate([
                'user',
                'reviews',
                'ratings',
                {
                    path: 'reviews',
                    populate: [
                        {
                            path: 'user',
                            model: 'User',
                        },
                    ],
                },
            ]);

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

    getAvailableCategories = async (cat: string) => {
        try {
            const catQuery = RecipeModel.distinct(cat);

            const category = await catQuery.lean();

            return {
                status: 'success',
                results: category.length,
                category,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: 0,
                category: [],
            };
        }
    };

    getAllRecipes = async (limit?: number) => {
        try {
            const recipesQuery = RecipeModel.find({
                temp: false,
            })
                .populate(['user', 'ratings'])
                .limit(limit || 0);

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
                .populate([
                    'user',
                    'ratings',
                    {
                        path: 'reviews',
                        model: 'Review',
                        populate: [
                            {
                                path: 'user',
                                model: 'User',
                            },
                            {
                                path: 'recipeAuthor',
                                model: 'User',
                            },
                        ],
                    },
                ])
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
            await ReviewModel.deleteMany({ recipe: recipe?.id });

            if (!recipe)
                return new ValidationError('No recipe with that id exists');

            return { status: 'success', recipe: undefined };
        } catch (error: any) {
            errorHandler(error);
            return { status: 'error', recipe: undefined };
        }
    };

    addRating = async (
        id: string,
        rating: number,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);

            const recipe = await RecipeModel.findByIdAndUpdate(
                id,
                { rating, user: user?._id },
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
                recipe,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                recipe: undefined,
            };
        }
    };
}
