import { type FC, useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import Recipe from '@components/recipe';
import { useAppSelector } from '@hooks';

const Preview: FC = () => {
    const user = useAppSelector(state => state.auth.user);

    const { watch, getValues } = useFormContext();
    const formValues = getValues();

    const title = watch('title');
    const description = watch('description');
    const prep = watch('prep');
    const image = watch('image');

    const recipe = useMemo(
        () => ({
            ...formValues,
            user,
            title,
            description,
            prep,
            image,
        }),
        [user, formValues, title, description, prep, image]
    );

    return <Recipe hideMobile {...recipe} />;
};

export default Preview;
