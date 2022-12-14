import Image from 'next/image';

import { Card, Title, Link } from './CardWithLinks';

const ReviewCard: React.FC = () => (
    <Card className="p-16 flex flex-col max-w-md shadow-card rounded-xl">
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
            <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.96028 6.14234C7.17996 6.36202 7.17996 6.71812 6.96028 6.93779L1.22541 12.6727C1.00573 12.8923 0.649631 12.8923 0.429956 12.6727L0.164756 12.4075C-0.0549187 12.1878 -0.0549187 11.8317 0.164756 11.612L5.23671 6.54007L0.164756 1.46812C-0.0549186 1.24844 -0.0549186 0.892341 0.164756 0.672667L0.429956 0.407467C0.649631 0.187792 1.00573 0.187792 1.22541 0.407467L6.96028 6.14234Z"
                    fill="black"
                />
            </svg>
        </Link>
    </Card>
);

export default ReviewCard;
