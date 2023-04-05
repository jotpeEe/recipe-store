import { useMemo } from 'react';

import format from 'date-fns/format';

import { IconNext } from '@icons';

import { Card, Link } from '../CardWithLinks';
import UserInfo from '../user/Info';

type ReviewProps = {
    text: string;
    recipe: {
        id: string;
        title: string;
        image: string;
    };
    user: {
        name: string;
        photo: string;
    };
    createdAt: string;
};

const ReviewCard: React.FC<ReviewProps> = ({
    text,
    recipe,
    user,
    createdAt,
}) => {
    const { name, photo } = user ?? {};
    const { id, title, image } = recipe ?? {};

    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        return format(date, 'MMMM dd, yyyy - HH:mm').toString();
    }, [createdAt]);

    return (
        <Card className="flex">
            <div className="flex flex-col p-8 max-w-md text-center shadow-card rounded-xl [&>*]:py-2">
                <Title href={`/recipes/${id}`}>
                    <RecipeTitle imgSrc={image} title={title} />
                </Title>
                <p className="text-lg text-left">{text}</p>
                <UserInfo
                    className="my-4"
                    title={name}
                    imgSrc={photo}
                    subtitle={formattedDate}
                />
                <Link
                    href={`/recipes/${id}`}
                    className="flex justify-start gap-4 items-center w-fit "
                >
                    Go to recipe
                    <IconNext />
                </Link>
            </div>
        </Card>
    );
};

export default ReviewCard;
