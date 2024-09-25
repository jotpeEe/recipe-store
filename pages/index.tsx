import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

import ScrollToTop from '@components/ScrollToTop';
import { Hero, Recipes, Reviews } from '@features';
import { useGetAllRecipesAndLastReviewsQuery } from '@generated/graphql';
import { queryClient, requestClient } from '@requests';

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Home: NextPage = () => {
    const { data } = useGetAllRecipesAndLastReviewsQuery(
        requestClient,
        { limit: 9 },
        {
            select: res => ({
                recipes: res.getAllRecipes.recipes,
                reviews: res.getLastReviews.reviews,
            }),
        }
    );

    return (
        <>
            <Hero />
            <Recipes recipes={data?.recipes} />
            <Reviews reviews={data?.reviews} />
            <ScrollToTop />
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
