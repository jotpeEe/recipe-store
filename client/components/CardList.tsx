type CardListProps = {
    children: React.ReactNode;
    wrap?: boolean;
};

const CardList: React.FC<CardListProps> = ({ children, wrap = false }) => (
    <ul
        className={`flex ${
            wrap ? 'flex-wrap' : 'flex-nowrap'
        } gap-12 flex-grow-0 `}
    >
        {children}
    </ul>
);

export default CardList;
