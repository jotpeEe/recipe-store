import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate } from 'react-query';

import { Slider, StepOne, StepTwo, StepThree, Preview } from '@components';
import { useGetTempRecipeQuery } from '@generated/graphql';
import { useAppDispatch } from '@hooks';
import { SectionLayout } from '@layouts';
import { setRecipe } from '@redux';
import { queryClient, requestClient } from '@requests';

const CreateRecipe: NextPage = () => {
    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetTempRecipeQuery(
        requestClient,
        {},
        {
            select: res => {
                const {
                    id,
                    __typename: tn,
                    ...recipe
                } = res.temp?.recipe ?? {};
                return recipe;
            },
            onSuccess(recipe) {
                dispatch(setRecipe(recipe));
            },
        }
    );

    if (isLoading) return null;

    return (
        <SectionLayout flex>
            <div className="w-[270px]">
                <Slider>
                    <StepOne defaultValues={data} />
                    <StepTwo />
                    <StepThree />
                </Slider>
            </div>
            <Preview />
        </SectionLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!req.cookies.access_token)
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            requireAuth: true,
            enableAuth: !!req.cookies.refresh_token,
        },
    };
};

export default CreateRecipe;
