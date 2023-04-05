type CardProps = {
    children: React.ReactNode;
    className?: string;
};

type LinkProps = CardProps & {
    href: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => (
    <div className={`relative ${className}`}>{children}</div>
);

export const Title: React.FC<LinkProps> = ({ children, href, className }) => (
    <a
        href={href}
        className={`before:absolute before:left-0 before:top-0 before:z-40 before:h-full before:w-full before:content-[''] ${className}`}
    >
        {children}
    </a>
);

export const Link: React.FC<LinkProps> = ({ children, href, className }) => (
    <a href={href} className={`z-50] ${className}`}>
        {children}
    </a>
);
