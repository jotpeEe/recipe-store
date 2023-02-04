import { ValidationError } from 'apollo-server-micro';

import errorHandler from '@controllers';
import { RecipeModel, ReviewModel } from '@models';
import { Reviews } from '@sections';
import { Context } from 'server/types/context';

export default class ReviewService {
    createReview = async (
        input: string,
        id: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);
            const recipe = await RecipeModel.findById(id)
                .populate('user')
                .lean();

            if (!recipe)
                return new ValidationError('No recipe with that id exists');

            const review = await ReviewModel.create({
                text: input,
                user: user?._id,
                recipe: recipe?._id,
                recipeAuthor: recipe?.user,
            });

            const options = {
                new: true,
                runValidators: true,
                lean: true,
            };

            if (recipe.reviews) {
                await RecipeModel.findByIdAndUpdate(
                    id,
                    {
                        ...recipe,
                        reviews: [...recipe.reviews, review._id],
                    },
                    options
                );
            } else {
                await RecipeModel.findByIdAndUpdate(
                    id,
                    {
                        ...recipe,
                        reviews: [review._id],
                    },
                    options
                );
            }

            return {
                status: 'success',
                review: {
                    ...review.toJSON(),
                    id: review?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                review: undefined,
            };
        }
    };

    getReviewsByAuthor = async (author: string) => {
        try {
            const reviews = await ReviewModel.find({
                recipeAuthor: author,
            })
                .populate(['user', 'recipeAuthor', 'recipe'])
                .lean();

            if (!reviews)
                return new ValidationError('No review with that id exists');

            return {
                status: 'success',
                results: reviews.length,
                reviews,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: 0,
                reviews: [],
            };
        }
    };

    getReviewsByRecipe = async (id: string) => {
        try {
            const reviews = await ReviewModel.find({ recipe: id })
                .populate(['user', 'recipeAuthor', 'recipe'])
                .sort({ createdAt: -1 })
                .lean();

            if (!reviews)
                return new ValidationError(
                    'No review with that recipe id exists'
                );

            return {
                status: 'success',
                results: reviews.length,
                reviews,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: Reviews.length,
                reviews: [],
            };
        }
    };

    updateReview = async (
        id: string,
        input: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);
            const review = await ReviewModel.findByIdAndUpdate(
                id,
                { text: input, user: user?._id },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            if (!review)
                return new ValidationError('No review with that id exists');

            return {
                status: 'success',
                review: {
                    ...review,
                    id: review?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                review: undefined,
            };
        }
    };

    getLastReviews = async () => {
        try {
            const reviewsQuery = ReviewModel.find()
                .populate(['user', 'recipe'])
                .limit(8);

            const reviews = await reviewsQuery
                .sort({ createdAt: -1 })
                .limit(10)
                .lean();

            return {
                status: 'success',
                results: reviews.length,
                reviews,
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

    deleteReview = async (
        id: string,
        recipeId: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            await deserializeUser(req, res);
            const recipe = await RecipeModel.findById(recipeId);
            const reviews = recipe?.reviews;

            const filtered = reviews?.filter(
                review => JSON.parse(JSON.stringify(review)) !== id
            );

            await RecipeModel.findByIdAndUpdate(
                recipeId,
                {
                    reviews: filtered,
                },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            const review = await ReviewModel.findByIdAndDelete(id);

            if (!review)
                return new ValidationError('No review with that id exists');

            return { status: 'success' };
        } catch (error: any) {
            errorHandler(error);
            return { status: 'error' };
        }
    };
}
