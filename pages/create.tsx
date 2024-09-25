import { useEffect, useState } from 'react';

import { dehydrate } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';

import { CreateRecipeContext } from '@contexts';
import { RecipeForm } from '@features';
import {
    type GetCreateRecipeDataQuery,
    useGetCreateRecipeDataQuery,
} from '@generated/graphql';
import { queryClient, requestClient } from '@requests';

const parseData = (res: GetCreateRecipeDataQuery) => {
    const cuisines = res.getAvailableCategories.category.sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
    );

    if (!res.getTempRecipe?.recipe) return { cuisines };

    const { id, ...recipe } = res.getTempRecipe.recipe;

    return { recipe, id, cuisines };
};

const CreateRecipe = () => {
    const [first, setFirst] = useState(true);
    const [step, setStep] = useState(0);

    const { data } = useGetCreateRecipeDataQuery(
        requestClient,
        {
            cat: 'cuisine',
        },
        {
            enabled: first,
            select: res => parseData(res),
        }
    );

    useEffect(() => {
        setFirst(false);
    }, []);

    const context = {
        id: data?.id,
        recipe: data?.recipe,
        step,
        setStep,
        cuisines: data?.cuisines,
    };

    return (
        <CreateRecipeContext.Provider value={context}>
            <RecipeForm />
        </CreateRecipeContext.Provider>
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
