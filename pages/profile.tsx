import { useMemo } from 'react';

import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

import { RecipesList, SearchInput, UserInfo, UserStats } from '@components';
import ReviewList from '@components/ReviewList';
import { useGetProfileDataQueryQuery } from '@generated/graphql';
import { SectionLayout as Layout } from '@layouts';
import { queryClient, requestClient } from '@requests';

export const ProfilePage: NextPage = () => {
    const { data, isLoading } = useGetProfileDataQueryQuery(
        requestClient,
        {},
        {
            select: res => ({
                reviews: res.getMyReviews.reviews,
                user: res.getMe.user,
                recipes: res.getAllRecipes.recipes,
            }),
        }
    );

    const myRecipes = useMemo(
        () => data?.recipes.filter(recipe => recipe.user.id === data.user.id),
        [data]
    );

    return (
        <Layout>
            {!isLoading && (
                <div className="lg:grid-rows-8 grid-rows-8 gap-y-18 relative grid grid-cols-1 gap-x-12 overflow-hidden lg:grid-cols-8">
                    <div className="col-start-1 grid gap-12 sm:grid-cols-4 lg:col-span-5 ">
                        <div className="flex w-full flex-col gap-8 sm:col-span-2">
                            <UserInfo
                                title={data?.user.name}
                                subtitle="What are we cooking today?"
                                imgSrc={data?.user.photo}
                            />
                            <SearchInput recipes={myRecipes} />
                        </div>
                        <UserStats
                            recipes={myRecipes?.length}
                            className="sm:col-span-2"
                        />
                    </div>
                    <div className="row-span-6 children:pb-5 lg:col-start-1 lg:col-end-6">
                        <h5>Your recipes</h5>
                        <RecipesList recipes={data?.recipes} panel />
                    </div>

                    <div className="col-start-1 children:pb-5 lg:col-span-2 lg:col-start-7 lg:row-start-2 ">
                        <h5>Reviews</h5>
                        <ReviewList reviews={data?.reviews} />
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
