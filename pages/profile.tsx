import { useEffect, useMemo } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { dehydrate } from 'react-query';

import { RecipesList, UserInfo, UserStats } from '@components';
import { GetMeDocument } from '@generated/graphql';
import {
    useAppDispatch,
    useAppSelector,
    useAuth,
    useRecipeQueries,
} from '@hooks';
import { SectionLayout, PageLayout } from '@layouts';
import { setPageLoading } from '@redux';
import { axiosGetMe, queryClient } from '@requests';

export const ProfilePage: NextPage = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state?.auth?.user);

    const { authRefresh } = useAuth();
    const { getRecipes } = useRecipeQueries();
    const { data: recipes, isLoading } = getRecipes;

    const recipesNumber = useMemo(() => recipes?.length, [recipes]);

    authRefresh();

    const { photo, name } = user ?? {};

    useEffect(() => {
        dispatch(setPageLoading(true));
    }, [isLoading]);

    return (
        <PageLayout>
            <SectionLayout>
                <div className="grid grid-cols-8 grid-rows-4 gap-y-24 gap-x-12">
                    <div className="grid grid-cols-4 gap-12 col-span-5">
                        <UserInfo
                            className="col-span-2"
                            name={name}
                            imgSrc={photo}
                        >
                            What are we cooking today?
                        </UserInfo>
                        <UserStats
                            recipes={recipesNumber}
                            className="col-span-2"
                        />
                    </div>
                    <RecipesList
                        recipes={recipes}
                        className="col-span-5 row-span-3"
                    />
                    <div className="col-start-7 row-start-2">Reviews</div>
                </div>
            </SectionLayout>
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (req.cookies.access_token) {
        await queryClient.prefetchQuery(['getMe', {}], () =>
            axiosGetMe(GetMeDocument, req.cookies.access_token as string)
        );
    } else {
        return {
            redirect: {
                destination: '/login',
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
