import { useEffect, useState } from 'react';

import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate } from '@tanstack/react-query';

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

    const { data: cuisines } = useGetCuisinesQuery(
        requestClient,
        {},
        {
            enabled: first,
            // sort case-insensitive
            select: res =>
                res.getCuisines.cuisines.sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                ),
        }
    );

    const { data, isLoading } = useGetTempRecipeQuery(
        requestClient,
        {},
        {
            enabled: first,
            select: res => {
                const {
                    id,
                    __typename: tn,
                    ...recipe
                } = res.temp?.recipe ?? {};
                return { recipe, id };
            },
            onSuccess(res) {
                dispatch(setRecipe({ id: res.id, ...res.recipe }));
            },
        }
    );

    useEffect(() => setFirst(false), []);

    if (isLoading) return null;

    return (
        <SectionLayout flex>
            <div className="w-[270px]">
                <Slider
                    breadcrumbs={['Add info', 'Add ingredients', 'Add steps']}
                >
                    <StepOne defaultValues={data?.recipe} cuisines={cuisines} />
                    <StepTwo id={data?.id} />
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
