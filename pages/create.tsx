import { useEffect, useState } from 'react';

import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate } from 'react-query';

import { Slider } from '@components';
import { Preview, StepOne, StepThree, StepTwo } from '@components/createRecipe';
import { useGetCuisinesQuery, useGetTempRecipeQuery } from '@generated/graphql';
import { useAppDispatch, useWindowSize } from '@hooks';
import { SectionLayout } from '@layouts';
import { setRecipe } from '@redux';
import { queryClient, requestClient } from '@requests';

const CreateRecipe: NextPage = () => {
    const [first, setFirst] = useState(true);
    const dispatch = useAppDispatch();
    const width = useWindowSize();

    const { data, isLoading } = useGetTempRecipeQuery(
        requestClient,
        {},
        {
            refetchOnMount: true,
            enabled: first,
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

    useEffect(() => setFirst(false), []);

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
            {width && width > 768 && <Preview />}
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
