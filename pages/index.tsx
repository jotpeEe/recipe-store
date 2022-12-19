import type { NextPage } from 'next';
import Head from 'next/head';

import { useRecipeQueries } from '@hooks';
import { PageLayout as Layout } from '@layouts';
import { Header, Recipes, Reviews } from '@sections';

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Home: NextPage = () => {
    const { getAllRecipes } = useRecipeQueries();

    const { data: recipes } = getAllRecipes;
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Header />
                <Recipes recipes={recipes} />
                <Reviews />
            </Layout>
        </>
    );
};

export default Home;
