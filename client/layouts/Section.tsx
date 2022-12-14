type SectionProps = {
    children: React.ReactNode;
    maxWidth?: boolean;
    id?: string;
};

const Section: React.FC<SectionProps> = ({
    children,
    id,
    maxWidth = false,
}) => (
    <section id={id} className={`${maxWidth ? 'max-w-full' : 'max-w-7xl'}`}>
        {children}
    </section>
);

export default Section;
