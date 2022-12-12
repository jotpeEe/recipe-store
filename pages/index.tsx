import type { NextPage } from 'next';
import Head from 'next/head';

import { PageLayout as Layout } from '@layouts';
import { Recipes, Reviews } from '@sections';

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Home: NextPage = () => (
    <>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <Recipes />
            <Reviews />
        </Layout>
    </>
);

export default Home;
