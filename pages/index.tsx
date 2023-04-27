import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

import { Hero, Recipes, Reviews } from '@features';
import { useGetAllRecipesAndLastReviewsQuery } from '@generated/graphql';
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
