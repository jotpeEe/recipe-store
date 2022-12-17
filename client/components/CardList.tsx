import classNames from 'classnames';

type CardListProps = {
    children: React.ReactNode;
    wrap?: boolean;
};

const CardList: React.FC<CardListProps> = ({ children, wrap = false }) => (
    <ul
        className={classNames(
            'flex  gap-12 flex-grow-0',
            wrap ? 'flex-wrap' : 'flex-nowrap'
        )}
    >
        {children}
    </ul>
);

export default CardList;
