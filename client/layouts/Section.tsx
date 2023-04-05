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
    <section id={id} className={cn('w-full py-12 sm:py-24 lg:py-28')}>
        <div
            className={cn(
                'px-3 sm:px-6 md:px-12',
                maxWidth ? 'max-w-full' : 'mx-auto max-w-7xl',
                flex && 'flex justify-center gap-6 md:gap-16 lg:gap-24',
                className && className
            )}
        >
            {children}
        </div>
    </section>
);

export default Section;
