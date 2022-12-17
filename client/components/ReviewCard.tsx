import Image from 'next/image';

import { IconNext } from '@icons';

import { Card, Title, Link } from './CardWithLinks';

const ReviewCard: React.FC = () => (
    <Card className="p-16 flex flex-col max-w-md text-center shadow-card rounded-xl">
        <div className="flex justify-start items-center gap-12 pb-12">
            <Image
                width={110}
                height={110}
                src="https://res.cloudinary.com/dxkgc7cab/image/upload/v1670864553/sdcidw0qi7c3sjtkss4i.png"
                alt="recipe image"
                className="rounded-full "
            />
            <h6 className="w-32">
                <Title href="https://mklos.co">Classic Greek Salad</Title>
            </h6>
        </div>
        <p className="text-lg text-left">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
            quis viverra ornare..."
        </p>
        <div className="flex gap-5 pt-6 pb-8">
            <Image
                width={56}
                height={56}
                src="https://res.cloudinary.com/dxkgc7cab/image/upload/v1670193828/yz0ynzz5uzm9thao3hhf.jpg"
                alt="recipe image"
                className="rounded-full "
            />
            <div className="flex flex-col justify-center items-start">
                <h5 className="">Name Surname</h5>
                <p className="text-base">Position, Company name</p>
            </div>
        </div>
        <Link
            href="https://v1.mklos.co"
            className="flex justify-start gap-4 items-center "
        >
            Go to recipe
            <IconNext />
        </Link>
    </Card>
);

export default ReviewCard;
