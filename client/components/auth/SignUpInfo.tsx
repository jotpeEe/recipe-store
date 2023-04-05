import { type FC, type ReactNode } from 'react';

import { IconCheck } from '@icons';

import Footer from './Footer';

const CheckListItem: FC<{ children: ReactNode }> = ({ children }) => (
    <li className="flex gap-2 text-sm">
        <IconCheck />
        {children}
    </li>
);

const SignUpInfo: FC = () => (
    <div className="flex max-w-[35ch] flex-col items-start p-8 font-sans [&>*]:pb-4">
        <h3 className="text-xl">Create an account</h3>
        <p className="">
            Let’s help you set up your account, it won’t take long.
        </p>
        <p>With account you can:</p>
        <ul className="[&>li]:pb-2">
            <CheckListItem>Create recipes.</CheckListItem>
            <CheckListItem>Bookmark recipes from others.</CheckListItem>
            <CheckListItem>Check your recipes</CheckListItem>
        </ul>
        <p>Let’s help you set up your account, it won’t take long.</p>
        <Footer type="signup" />
    </div>
);

export default SignUpInfo;
