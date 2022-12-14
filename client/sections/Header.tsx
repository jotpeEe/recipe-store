import Image from 'next/image';

import { SectionTitle } from '@components';

const Header = () => (
    <header className="h-screen w-full">
        <div className="flex justify-between items-center h-full max-w-7xl px-header-p mx-auto">
            <SectionTitle
                title="RecipeStore"
                description="Simple way to find Tasty Recipe"
                button="Start cooking"
            />
            <Image src="/hero.png" alt="me" width="500" height="500" />
        </div>
    </header>
);

export default Header;
