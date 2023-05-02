import { type FC, useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { useCreateRecipe } from '@contexts';
import { useAppSelector } from '@hooks';

import Recipe from '../RecipeView';

const Preview: FC = () => {
    const user = useAppSelector(state => state.auth.user);

    const { watch, getValues } = useFormContext();
    const { step } = useCreateRecipe();
    const formValues = getValues();

    const title = watch('title');
    const description = watch('description');
    const prep = watch('prep');
    const image = watch('image');
    const ingredients = watch('ingredients');
    const steps = watch('steps');

    const recipe = useMemo(
        () => ({
            user,
            title,
            description,
            prep,
            image,
            ingredients,
            step,
            steps,
        }),
        [
            user,
            formValues,
            title,
            ingredients,
            steps,
            step,
            description,
            prep,
            image,
        ]
    );

    return <Recipe hideMobile {...recipe} />;
};

export default Preview;
