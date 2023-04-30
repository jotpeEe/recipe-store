import { ValidationError } from 'apollo-server-micro';

import errorHandler from '@controllers';
import { RatingModel, RecipeModel } from '@models';
import { type Context } from 'server/types/context';

export default class RatingService {
    createRating = async (
        input: number,
        id: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);
            const recipe = await RecipeModel.findById(id).lean();

            if (!recipe)
                return new ValidationError('No recipe with that id exists');

            const isExisting = await RatingModel.findOne({
                user: user?._id,
                recipe: recipe?._id,
            });

            if (isExisting)
                return new ValidationError(
                    'Recipe already has rating from the user'
                );

            const rating = await RatingModel.create({
                rating: input,
                user: user?._id,
                recipe: recipe?._id,
            });

            let ratings = [];

            if (recipe.ratings) {
                ratings = [...recipe.ratings, rating?._id];
            } else {
                ratings = [rating?._id];
            }

            await RecipeModel.findByIdAndUpdate(
                id,
                { ratings },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            return {
                status: 'success',
                rating: {
                    ...rating.toJSON(),
                    id: rating?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                rating: undefined,
            };
        }
    };

    updateRating = async (
        id: string,
        input: number,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);
            const rating = await RatingModel.findByIdAndUpdate(
                id,
                { rating: input, user: user?._id },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            if (!rating)
                return new ValidationError('No review with that id exists');

            return {
                status: 'success',
                rating: {
                    ...rating,
                    id: rating?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                rating: undefined,
            };
        }
    };

    deleteRating = async (
        id: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            await deserializeUser(req, res);
            const rating = await RatingModel.findByIdAndDelete(id);

            if (!rating)
                return new ValidationError('No review with that id exists');

            const recipe = await RecipeModel.findById(rating?.recipe);
            const ratings = recipe?.ratings;

            const filtered = ratings?.filter(
                item => JSON.parse(JSON.stringify(item)) !== id
            );

            await RecipeModel.findByIdAndUpdate(
                rating?.recipe,
                {
                    ratings: filtered,
                },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            return { status: 'success' };
        } catch (error: any) {
            errorHandler(error);
            return { status: 'error' };
        }
    };
}
