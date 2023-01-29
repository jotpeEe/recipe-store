type CardProps = {
    children: React.ReactNode;
    className?: string;
};

type LinkProps = CardProps & {
    href: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => (
    <li className={`relative ${className}`}>{children}</li>
);

export const Title: React.FC<LinkProps> = ({ children, href, className }) => (
    <a
        href={href}
        className={`before:content-[''] before:absolute before:w-full before:h-full before:left-0 before:top-0 before:z-40 ${className}`}
    >
        {children}
    </a>
);

export const Link: React.FC<LinkProps> = ({ children, href, className }) => (
    <a href={href} className={`z-50] ${className}`}>
        {children}
    </a>
);
