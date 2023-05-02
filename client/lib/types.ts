import {
    type GetMeQuery,
    type GetProfileDataQueryQuery,
    type GetRecipeByIdQuery,
} from '@generated/graphql';

export type IUser = GetMeQuery['getMe']['user'];

export type IRecipe = GetRecipeByIdQuery['getRecipeById']['recipe'];

export type RecipeProps = Partial<IRecipe> & {
    step?: number;
    withEdit?: boolean;
    hideMobile?: boolean;
};

export type IReview = GetProfileDataQueryQuery['getMyReviews']['reviews'][0];
