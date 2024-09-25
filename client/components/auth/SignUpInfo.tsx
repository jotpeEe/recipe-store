import { type FC } from 'react';

import Icon from '@icons';

import ControlPanel from './ControlPanel';

const SignUpInfo: FC = () => {
    const checkList = [
        'Create recipes.',
        'Bookmark recipes from others.',
        'Check your recipes',
    ];

    return (
        <div className="flex max-w-[35ch] flex-col items-start gap-4 p-8 font-sans">
            <h3 className="text-xl">Create an account</h3>
            <p className="">
                Let’s help you set up your account, it won’t take long.
            </p>
            <p>With account you can:</p>
            <ul>
                {checkList.map((msg, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 pb-2 text-sm"
                    >
                        <div className="rounded-full border border-primary p-1 ">
                            <Icon name="Check" className="h-2.5 text-primary" />
                        </div>
                        {msg}
                    </li>
                ))}
            </ul>
            <p>Let’s help you set up your account, it won’t take long.</p>
            <ControlPanel variant="signup" />
        </div>
    );
};

export default SignUpInfo;
