import { type NextPage } from 'next';

import { Recipe } from '@components';
import {
    useGetRecipeByIdQuery,
    useGetReviewsByRecipeQuery,
} from '@generated/graphql';
import { requestClient } from '@requests';

type RecipeInfoProps = {
    id?: string;
};

const RecipeInfo: NextPage<RecipeInfoProps> = ({ id }) => {
    if (!id) return null;

    const { data: recipe } = useGetRecipeByIdQuery(
        requestClient,
        { id },
        { select: data => data.getRecipe.recipe }
    );

    const { data: reviews } = useGetReviewsByRecipeQuery(
        requestClient,
        {
            id,
        },
        {
            select: data => data.getReviewsByRecipe.reviews,
        }
    );

    return (
        <div className="flex justify-center py-32">
            <Recipe {...{ ...recipe, reviews }} />
        </div>
    );
};

RecipeInfo.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id: id as string };
};

export default RecipeInfo;
