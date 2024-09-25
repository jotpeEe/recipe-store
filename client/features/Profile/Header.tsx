import React, { type FC } from 'react';

import { UserInfo, UserStats } from '@components';
import { type GetProfileDataQueryQuery } from '@generated/graphql';

type ProfileHeaderProps = {
    user?: GetProfileDataQueryQuery['getMe']['user'];
    recipesNum?: number;
};

const Header: FC<ProfileHeaderProps> = ({ user, recipesNum }) => (
    <div className="mx-auto mb-6 grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
        <div className="flex w-fit flex-col gap-8 md:col-span-2">
            <UserInfo
                title={user?.name}
                subtitle="What are we cooking today?"
                imgSrc={user?.photo}
            />
        </div>
        <UserStats className="md:col-start-3" recipes={recipesNum} />
    </div>
);

export default Header;
