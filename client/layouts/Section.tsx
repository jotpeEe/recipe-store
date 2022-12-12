type SectionProps = {
    children: React.ReactNode;
    maxWidth?: boolean;
};

const Section: React.FC<SectionProps> = ({ children, maxWidth = false }) => (
    <section className={`${maxWidth ? 'max-w-full' : 'max-w-7xl'}`}>
        {children}
    </section>
);

export default Section;
