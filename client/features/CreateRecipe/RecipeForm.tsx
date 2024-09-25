import { type FC } from 'react';

import { dehydrate } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import { FormProvider } from 'react-hook-form';

import { Slider } from '@components';
import { queryClient } from '@requests';
import useSubmit from 'client/hooks/createRecipe/useSubmit';

import Preview from './Preview';
import FormStepOne from './StepOne';
import FormStepThree from './StepThree';
import FormStepTwo from './StepTwo';

/**
 * CreateRecipe feature with {@link https://react-hook-form.com/ | react-hook-form} form provider
 * and {@link CreateRecipeContext}.
 *
 * */
const RecipeForm: FC = () => {
    const { handleSubmit, isLoading, methods } = useSubmit();

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-7xl gap-10 pt-24"
            >
                <Slider
                    className="max-w-[300px]"
                    fullWidth
                    config={{ listeners: false }}
                    breadcrumbs={['Add info', 'Add ingredients', 'Add steps']}
                >
                    <FormStepOne />
                    <FormStepTwo />
                    <FormStepThree isLoading={isLoading} />
                </Slider>
                <Preview />
            </form>
        </FormProvider>
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
            create: true,
            dehydratedState: dehydrate(queryClient),
            requireAuth: true,
            enableAuth: !!req.cookies.refresh_token,
        },
    };
};

export default RecipeForm;
