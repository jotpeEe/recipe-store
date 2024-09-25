import { type NextPage } from 'next';
import dynamic from 'next/dynamic';

import ReviewTest from '@components/card/ReviewTest';
import Filter from '@components/Filter';
import Spinner from '@components/Spinner';
import NavBar from '@components/ui/nav';
import Skeleton from '@components/ui/skeleton';
import { type FilterOption } from '@lib/types';

const Review = dynamic(() => import('../client/components/card/Review'), {
    loading: () => <Spinner />,
});

const CreateRecipe: NextPage = () => {
    const handleSubmit = (activeFilters: FilterOption | undefined) => {
        console.log(activeFilters);
    };

    const review = {
        id: '6479fae2f250e19ef8376e70',
        text: 'fasfdasfdasfdadsfasfdasdfsdhfsdlkhdjgshdkjgdsgflksjdglkdshglkdshgdslkfsjgdskjgdsfkjgsdfkjgflksjdgflkdshgslkdhgdslkfjgsdklfkjghfdskjghfdsgfdshgdsflkgdsfglksglkdshgslkdhgsdlkfgsdhsdhsdkghsdfkjdsgflkjdsgflkjfdsglkdshgsdlfsdhsdfkjgdsflkgjfdsglkjdsgflkdsglkdshgdslkhgsdkfhsdlkfsdhsdhsdfhjsdfhdfdfkgjshd',
        createdAt: new Date('2023-06-05T08:19:35.060+00:00'),
        user: {
            id: '644e6628e0c8da150b14996a',
            name: 'Diego Maradona',
            photo: 'https://res.cloudinary.com/dxkgc7cab/image/upload/v1682859559/awnxp09yzwi2mhh7u1dk.jpg',
        },
        pos: [],
        neg: [],
        recipe: 'fsadfasdfasfd',
        recipeAuthor: {
            id: '644e6644e0c8da150b149974',
            name: 'Cristiano Ronaldo',
            photo: 'https://res.cloudinary.com/dxkgc7cab/image/upload/v1682859587/r1bovxkir4sjycbua3jt.jpg',
        },
    };

    return (
        <>
            <NavBar />
            <div className="mt-24 flex flex-col items-center justify-center">
                <Filter
                    filterGroups={[
                        {
                            name: 'Time',
                            options: ['All', 'Newest', 'Oldest', 'Popularity'],
                        },
                        {
                            name: 'Rating',
                            options: [1, 2, 3, 4, 5],
                        },
                        {
                            name: 'Category',
                            options: ['All', 'Cereal', 'Vegetables'],
                        },
                    ]}
                    handleSubmit={handleSubmit}
                />
            </div>
            <Review {...review} />
            <div className="w-[350px]">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
            <ReviewTest />
        </>
    );
};

export default CreateRecipe;
