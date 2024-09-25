import React, { type FC } from 'react';

import Icon, { type IconNames } from '@components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui';

export type ProfileStatsData = {
    title?: string;
    icon: IconNames;
    value?: number | undefined;
    description?: string;
};

type ProfileStatsProps = {
    stats: ProfileStatsData[];
};

const Stats: FC<ProfileStatsProps> = ({ stats }) => (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ title, icon, value, description }, index) => (
            <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold">{title}</CardTitle>
                    <Icon name={icon} className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                    <div className="text-xl font-bold">{value}</div>
                    <p className="text-xs text-muted">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
);

export default Stats;
