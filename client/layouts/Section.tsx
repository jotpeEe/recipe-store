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
    <section id={id} className="w-full py-28">
        <div className={`${maxWidth ? 'max-w-full' : 'mx-auto max-w-7xl'}`}>
            {children}
        </div>
    </section>
);

export default Section;
