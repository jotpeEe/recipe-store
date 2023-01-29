import classNames from 'classnames';

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
    <section id={id} className="w-full py-28">
        <div
            className={classNames(
                'md:px-12 px-6',
                maxWidth ? 'max-w-full' : 'mx-auto max-w-7xl',
                flex && 'flex justify-center lg:gap-24 md:gap-16 gap-6',
                className && className
            )}
        >
            {children}
        </div>
    </section>
);

export default Section;
