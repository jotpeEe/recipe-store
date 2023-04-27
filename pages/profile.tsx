import { useEffect, useState } from 'react';

import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

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
                <div className="lg:grid-rows-8 grid-rows-8 gap-y-18 relative grid grid-cols-1 gap-x-12 overflow-hidden lg:grid-cols-8">
                    <div className="col-start-1 grid gap-12 sm:grid-cols-4 lg:col-span-5 ">
                        <div className="flex w-full flex-col gap-8 sm:col-span-2">
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
                    <div className="row-span-6 children:pb-5 lg:col-start-1 lg:col-end-6">
                        <h5>Your recipes</h5>
                        <RecipesList recipes={recipes} panel />
                    </div>

                    <div className="col-start-1 children:pb-5 lg:col-span-2 lg:col-start-7 lg:row-start-2 ">
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
