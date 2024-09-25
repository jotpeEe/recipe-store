import { type FC, type ReactNode } from 'react';

type UserStatsProps = {
    recipes?: number;
    followers?: number;
    following?: number;
    className?: string;
};

type ListItemProps = {
    children: ReactNode;
    label: string;
};

const ListItem: FC<ListItemProps> = ({ label, children }) => (
    <li className="flex flex-col items-center text-xl font-semibold">
        <h6 className="text-xs font-normal text-outlined">{label}</h6>
        {children}
    </li>
);

const UserStats: FC<UserStatsProps> = ({
    followers = 0,
    following = 0,
    className,
}) => (
    <div className={`flex flex-col gap-11 ${className}`}>
        <ul className="flex gap-2.5">
            <ListItem label="Followers">{followers}</ListItem>
            <ListItem label="Following">{following}</ListItem>
        </ul>
    </div>
);

export default UserStats;
