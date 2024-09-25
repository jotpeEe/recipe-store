import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

const ReviewTest = () => (
    <figure className="dark:highlight-white/5 relative flex flex-col-reverse rounded-lg bg-slate-50 p-6 dark:bg-slate-800">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
            <p>Skip to the end. Use @tailwindcss.</p>
        </blockquote>
        <figcaption className="flex items-center space-x-4">
            <Image
                width={36}
                height={36}
                src="/default.png"
                alt=""
                className="h-14 w-14 flex-none rounded-full object-cover"
                loading="lazy"
                decoding="async"
            />
            <div className="flex-auto">
                <div className="text-base font-semibold text-slate-900 dark:text-slate-300">
                    <Link href="/profile">
                        <span className="absolute inset-0"></span>Kent C. Dodds
                    </Link>
                </div>
                <div className="mt-0.5">Developer and Educator</div>
            </div>
        </figcaption>
    </figure>
);

export default ReviewTest;
