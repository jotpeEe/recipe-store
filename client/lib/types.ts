import { type SubmitHandler } from 'react-hook-form';

import {
    type GetMeQuery,
    type GetProfileDataQueryQuery,
    type GetRecipeByIdQuery,
    type UpdateInput,
} from '@generated/graphql';

export type IUser = GetMeQuery['getMe']['user'];

export type IRecipe = GetRecipeByIdQuery['getRecipeById']['recipe'];

export type RecipeProps = Partial<IRecipe> & {
    step?: number;
    withEdit?: boolean;
    onSubmit?: SubmitHandler<UpdateInput>;
    isEnterPressed?: boolean;
    hideMobile?: boolean;
};

export type IReview = GetProfileDataQueryQuery['getMyReviews']['reviews'][0];
