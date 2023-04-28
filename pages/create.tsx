import { useCallback, useEffect, useState } from 'react';

import { dehydrate } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';

import { RecipeForm } from '@features';
import {
    type GetCuisinesQuery,
    type GetTempRecipeQuery,
    useGetCuisinesQuery,
    useGetTempRecipeQuery,
} from '@generated/graphql';
import { queryClient, requestClient } from '@requests';

const CreateRecipe = () => {
    const [first, setFirst] = useState(true);

    const { data: cuisines } = useGetCuisinesQuery(
        requestClient,
        {},
        {
            enabled: first,
            // sort case-insensitive
            select: useCallback(
                (res: GetCuisinesQuery) =>
                    res.getCuisines.cuisines.sort((a, b) =>
                        a.toLowerCase().localeCompare(b.toLowerCase())
                    ),
                []
            ),
        }
    );

    const { data } = useGetTempRecipeQuery(
        requestClient,
        {},
        {
            enabled: first,
            select: useCallback((res: GetTempRecipeQuery) => {
                if (!res.temp?.recipe) return undefined;
                const { id, ...recipe } = res.temp.recipe;
                return { recipe, id };
            }, []),
        }
    );

    useEffect(() => {
        setFirst(false);
    }, []);

    return (
        <RecipeForm cuisines={cuisines} id={data?.id} recipe={data?.recipe} />
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!req.cookies.access_token)
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };

    return {
        props: {
            create: true,
            dehydratedState: dehydrate(queryClient),
            requireAuth: true,
            enableAuth: !!req.cookies.refresh_token,
        },
    };
};

export default CreateRecipe;
