import { useEffect } from 'react';

import { hasCookie } from 'cookies-next';
import { type NextPage } from 'next';

import { Recipe } from '@components';
import { useGetMeQuery, useGetRecipeByIdQuery } from '@generated/graphql';
import { requestClient } from '@requests';

const RecipeInfo: NextPage<{ id?: string }> = ({ id }) => {
    if (!id) return null;

    const { data, isLoading } = useGetRecipeByIdQuery(
        requestClient,
        { id },
        {
            select: res => res.getRecipeById.recipe,
        }
    );

    const query = useGetMeQuery(requestClient, {}, { enabled: false });

    const loggedIn = hasCookie('logged_in');

    useEffect(() => {
        if (loggedIn) query.refetch();
    }, []);

    if (isLoading) return null;
    if (!data) return null;

    return (
        <div className="flex justify-center py-32">
            <Recipe {...data} withEdit={true} />
        </div>
    );
};

RecipeInfo.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id: id as string };
};

export default RecipeInfo;
