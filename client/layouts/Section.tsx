import cn from 'classnames';

type SectionProps = {
    children: React.ReactNode;
    className?: string;
    maxWidth?: boolean;
    id?: string;
    flex?: boolean;
};

const Section: React.FC<SectionProps> = ({
    children,
    className,
    id,
    flex,
    maxWidth = false,
}) => (
    <section
        id={id}
        className={cn('h-full w-full pt-12 sm:pt-24 sm:pb-0 lg:pt-28 lg:pb-0')}
    >
        <div
            className={cn(
                maxWidth
                    ? 'max-w-full'
                    : 'mx-auto max-w-7xl px-3 sm:px-6 md:px-12',
                flex && 'flex justify-center gap-6 md:gap-16 lg:gap-24',
                className && className
            )}
        >
            {children}
        </div>
    </section>
);

export default Section;
