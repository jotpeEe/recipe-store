type CardListProps = {
    children: React.ReactNode;
    wrap?: boolean;
};

const CardList: React.FC<CardListProps> = ({ children, wrap = false }) => (
    <div
        className={`flex ${
            wrap ? 'flex-wrap' : 'flex-nowrap'
        } gap-12 flex-grow-0 `}
    >
        {children}
    </div>
);

export default CardList;
