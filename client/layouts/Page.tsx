import Image from 'next/image';

import { Nav } from '@components';

type PageProps = {
    children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Nav />

        <main className="flex w-full flex-1 flex-col items-center justify-center">
            {children}
        </main>

        <footer className="flex h-24 w-full items-center justify-center border-t">
            <a
                className="flex items-center justify-center gap-2"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                />
            </a>
        </footer>
    </div>
);

export default Page;
