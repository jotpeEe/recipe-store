import { type FC } from 'react';

import Recipe from '@components/recipe';
import { useAppSelector } from '@hooks';

const Preview: FC<{ withEdit?: boolean }> = ({ withEdit }) => {
    const { recipe, auth } = useAppSelector(state => state);

    const { user } = auth;

    return <Recipe {...{ ...recipe, user, withEdit }} />;
};

export default Preview;
