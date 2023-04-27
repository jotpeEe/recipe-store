import Image from 'next/image';

import { SectionTitle } from '@components';

const Hero = () => (
    <section className="h-full w-full pt-5 sm:pt-24 md:h-screen">
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-12 md:flex-row md:justify-between md:gap-4 lg:px-header-p">
            <SectionTitle
                title="RecipeStore"
                description="Simple way to find tasty recipe"
                href="/profile"
                buttonText="Start cooking"
                center
            />
            <Image
                src="/hero.png"
                priority={true}
                alt="me"
                width="500"
                height="500"
            />
        </div>
    </section>
);

export default Hero;
