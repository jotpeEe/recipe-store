import { useMemo } from 'react';

import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

import {
    ProfileHeader,
    ProfileListsDisplay,
    ProfileStats,
    type ProfileStatsData,
} from '@features';
import {
    type GetProfileDataQueryQuery,
    useGetProfileDataQueryQuery,
} from '@generated/graphql';
import { useAppSelector } from '@hooks';
import { SectionLayout as Layout } from '@layouts';
import { queryClient, requestClient } from '@requests';

const getOthersReviews = (
    recipes?: GetProfileDataQueryQuery['getRecipes']['recipes']
) => {
    const user = useAppSelector(state => state.auth.user);
    const othersReviews: GetProfileDataQueryQuery['getRecipes']['recipes'][0]['reviews'] =
        [];

    recipes?.forEach(recipe =>
        recipe.reviews.forEach(review => {
            if (review.user.id !== user?.id) {
                othersReviews.push(review);
            }
        })
    );

    return othersReviews;
};

const getLastMonthGrowth = <T extends { createdAt: string }>(
    array: T[] | undefined
) => {
    if (!array) return undefined;
    if (array.length === 0) return '0';

    const now = new Date();
    const lastMonth = new Date();

    lastMonth.setDate(lastMonth.getDate() - 30);

    const pastMonthItems = array.filter(item => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= lastMonth && createdAt <= now;
    });

    const percentageIncrease = (pastMonthItems.length / array.length) * 100;
    return `+${pastMonthItems.length}(${percentageIncrease.toFixed(
        1
    )}%) from last month`;
};

export const ProfilePage: NextPage = () => {
    const { data, isLoading } = useGetProfileDataQueryQuery(
        requestClient,
        {},
        {
            select: res => ({
                bookmarks: res.getAllBookmarkedRecipes.recipes,
                reviews: res.getMyReviews.reviews,
                user: res.getMe.user,
                recipes: res.getRecipes.recipes,
            }),
        }
    );

    const othersReviews = getOthersReviews(data?.recipes);

    const statsFeed = useMemo<ProfileStatsData[]>(
        () => [
            {
                title: 'Your recipes',
                icon: 'List',
                value: data?.recipes.length,
                description: getLastMonthGrowth(data?.recipes),
            },
            {
                title: 'Saved Recipes',
                icon: 'Bookmark',
                value: data?.bookmarks.length,
                description: getLastMonthGrowth(data?.bookmarks),
            },
            {
                title: 'Your reviews',
                icon: 'Person',
                value: data?.reviews.length,
                description: getLastMonthGrowth(data?.reviews),
            },
            {
                title: 'People reviews',
                icon: 'Others',
                value: othersReviews?.length,
                description: getLastMonthGrowth(othersReviews),
            },
        ],
        [data?.recipes, data?.reviews, othersReviews]
    );

    const { user, ...rest } = data ?? {};

    return (
        <Layout maxWidth>
            {!isLoading && (
                <>
                    <ProfileHeader
                        user={user}
                        recipesNum={data?.recipes.length}
                    />
                    <ProfileStats stats={statsFeed} />
                    <ProfileListsDisplay {...rest} />
                </>
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
            nav: 'alwaysActive',
        },
    };
};
export default ProfilePage;
