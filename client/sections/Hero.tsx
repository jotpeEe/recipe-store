import Image from 'next/image';

import { SectionTitle } from '@components';

const Hero = () => (
    <div className="pt-[100px] h-full sm:h-screen w-full">
        <div className="flex md:flex-row flex-col md:justify-between justify-center gap-10 md:gap-4 items-center h-full max-w-7xl px-12 lg:px-header-p mx-auto">
            <SectionTitle
                title="RecipeStore"
                description="Simple way to find Tasty Recipe"
                href="/profile"
                buttonText="Start cooking"
                center
            />
            <Image src="/hero.png" alt="me" width="500" height="500" />
        </div>
    </div>
);

export default Hero;
