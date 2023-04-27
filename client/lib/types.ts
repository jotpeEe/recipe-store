import { type GetMeQuery, type GetRecipeByIdQuery } from '@generated/graphql';

export type IUser = GetMeQuery['getMe']['user'];

export type IRecipe = GetRecipeByIdQuery['getRecipeById']['recipe'];

export type IReview = GetRecipeByIdQuery['getReviewsBy']['reviews'][0];
