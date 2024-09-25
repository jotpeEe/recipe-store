import { hasCookie } from 'cookies-next';
import { type GetServerSideProps, type NextPage } from 'next';

import { RecipeView } from '@features';
import { useGetMeQuery, useGetRecipeByIdQuery } from '@generated/graphql';
import { requestClient } from '@requests';

type RecipePageProps = {
    id?: string | string[];
};

const RecipeInfo: NextPage<RecipePageProps> = ({ id }) => {
    if (!id) return null;

    const recipeId = Array.isArray(id) ? id[0] : id;

    const { data, isLoading } = useGetRecipeByIdQuery(
        requestClient,
        { id: recipeId },
        { select: res => res.getRecipeById.recipe }
    );

    const loggedUser = hasCookie('logged_in');

    useGetMeQuery(requestClient, {}, { enabled: loggedUser });

    if (isLoading) return null;
    if (!data) return null;

    return (
        <div className="flex justify-center py-32">
            <RecipeView {...data} withEdit={true} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<
    RecipePageProps
> = async context => {
    const { id } = context.query;

    return { props: { id } };
};

export default RecipeInfo;
