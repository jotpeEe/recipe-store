import { Hero, Recipes, Reviews } from '@sections';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate } from 'react-query';

import { useGetAllRecipesQuery } from '@generated/graphql';
import { useAppDispatch } from '@hooks';
import { setPageLoading } from '@redux';
import { queryClient, requestClient } from '@requests';

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Home: NextPage = () => {
    const dispatch = useAppDispatch();

    const { data: recipes } = useGetAllRecipesQuery(
        requestClient,
        {},
        {
            select: data => data.getAllRecipes.recipes,
            onError() {
                dispatch(setPageLoading(false));
            },
        }
    );

    return (
        <>
            <Hero />
            <Recipes recipes={recipes} />
            <Reviews />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
    props: {
        dehydratedState: dehydrate(queryClient),
        enableAuth: !!req.cookies.refresh_token,
    },
});

export default Home;
