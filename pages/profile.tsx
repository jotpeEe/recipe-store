import { useEffect, useState } from 'react';

import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate } from 'react-query';

import { RecipesList, SearchInput, UserInfo, UserStats } from '@components';
import ReviewList from '@components/ReviewList';
import {
    useGetMyRecipesQuery,
    useGetReviewsByAuthorQuery,
} from '@generated/graphql';
import { useAppDispatch, useAppSelector } from '@hooks';
import { SectionLayout as Layout } from '@layouts';
import { setPageLoading } from '@redux';
import { queryClient, requestClient } from '@requests';

export const ProfilePage: NextPage = () => {
    const [fetch, setFetch] = useState(false);
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state?.auth?.user);

    const { data: recipes, isLoading } = useGetMyRecipesQuery(
        requestClient,
        {},
        {
            select: data => data.getRecipes.recipes,
            onError() {
                dispatch(setPageLoading(false));
            },
        }
    );

    const { data: reviews } = useGetReviewsByAuthorQuery(
        requestClient,
        {
            author: user?._id as string,
        },
        { enabled: fetch, select: data => data.getReviewsByAuthor.reviews }
    );

    const { photo, name } = user ?? {};

    useEffect(() => {
        queryClient.refetchQueries('GetTempRecipe');
    }, []);

    useEffect(() => {
        if (user) setFetch(true);
        if (!user) setFetch(false);
    }, [user]);

    return (
        <Layout>
            {!isLoading && (
                <div className="grid lg:grid-cols-8 grid-cols-1 lg:grid-rows-8 grid-rows-8 gap-y-18 gap-x-12 relative overflow-hidden">
                    <div className="grid sm:grid-cols-4 gap-12 lg:col-span-5 col-start-1 lg:mx-0 mx-auto">
                        <div className="flex flex-col sm:col-span-2 gap-8 w-full">
                            <UserInfo
                                title={name}
                                subtitle="What are we cooking today?"
                                imgSrc={photo}
                            />
                            <SearchInput recipes={recipes} />
                        </div>
                        <UserStats
                            recipes={recipes?.length}
                            className="sm:col-span-2"
                        />
                    </div>
                    <div className="lg:col-start-1 lg:col-end-6 row-span-6 children:pb-5">
                        <h5>Your recipes</h5>
                        <RecipesList recipes={recipes} panel />
                    </div>

                    <div className="lg:col-start-7 lg:col-span-2 col-start-1 lg:row-start-2 children:pb-5 ">
                        <h5>Reviews</h5>
                        <ReviewList reviews={reviews} />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!req.cookies.access_token) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            requireAuth: true,
            enableAuth: true,
        },
    };
};
export default ProfilePage;
