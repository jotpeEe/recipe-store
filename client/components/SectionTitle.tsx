import Button from './Button';

type SectionTitleProps = {
    subtitle: string;
    title: string;
    description: string;
    button?: boolean;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
    subtitle,
    title,
    description,
    button = false,
}) => (
    <div className="flex flex-col justify-start text-left align-start max-w-lg">
        <h5 className="pb-4">{subtitle}</h5>
        <h2 className="pb-6">{title}</h2>
        <h4 className="pb-6">{description}</h4>
        {button && <Button>Create recipe</Button>}
    </div>
);

export default SectionTitle;