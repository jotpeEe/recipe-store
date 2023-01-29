import classNames from 'classnames';

import Button from './Button';

type SectionTitleProps = {
    subtitle?: string;
    title: string;
    description: string;
    center?: boolean;
    href?: string;
    buttonText?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
    subtitle,
    title,
    description,
    href,
    center = false,
    buttonText,
}) => (
    <div
        className={classNames(
            'flex flex-col lg:max-w-[40ch] md:max-w-xl md:text-left',
            center
                ? 'text-center justify-center align-center'
                : 'text-left justify-start align-start max-w-xl'
        )}
    >
        <h5 className="pb-4">{subtitle}</h5>
        <h2 className="pb-6">{title}</h2>
        <h4 className="pb-6">{description}</h4>
        {href && (
            <Button
                className={`${center && 'md:mx-0 mx-auto'}`}
                href={href}
                arrow
            >
                {buttonText}
            </Button>
        )}
    </div>
);

export default SectionTitle;
