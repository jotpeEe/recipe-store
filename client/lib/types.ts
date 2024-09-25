import { type SubmitHandler } from 'react-hook-form';

import {
    type GetMeQuery,
    type GetProfileDataQueryQuery,
    type GetRecipeByIdQuery,
    type UpdateInput,
} from '@generated/graphql';

export type FilterOption = {
    [k: string]: string | number;
};

export type IUser = GetMeQuery['getMe']['user'];

export type IRecipe = GetRecipeByIdQuery['getRecipeById']['recipe'];

export type RecipeProps = Partial<IRecipe> & {
    step?: number;
    withEdit?: boolean;
    onSubmit?: SubmitHandler<UpdateInput>;
    isEnterPressed?: boolean;
    isClickedOutside?: boolean;
    hideMobile?: boolean;
};

export type RecipeHeaderState = {
    title?: RecipeProps['title'];
    image?: RecipeProps['image'];
    user?: RecipeProps['user'];
    withEdit?: boolean;
    prep?: RecipeProps['prep'];
    ratings?: RecipeProps['ratings'];
    ref?: React.MutableRefObject<HTMLElement | null>;
};

export type IReview = GetProfileDataQueryQuery['getMyReviews']['reviews'][0];
