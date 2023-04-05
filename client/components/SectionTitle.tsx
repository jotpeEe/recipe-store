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
            'flex flex-col md:max-w-xl md:text-left lg:max-w-[40ch]',
            center
                ? 'align-center justify-center text-center'
                : 'align-start max-w-xl justify-start text-left'
        )}
    >
        <h5 className="pb-4">{subtitle}</h5>
        <h2 className="pb-6">{title}</h2>
        <h4 className="pb-6">{description}</h4>
        {href && (
            <Button
                className={`${center && 'mx-auto md:mx-0'}`}
                href={href}
                arrow
            >
                {buttonText}
            </Button>
        )}
    </div>
);

export default SectionTitle;
