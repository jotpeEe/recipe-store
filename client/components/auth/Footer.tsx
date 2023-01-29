import { FC } from 'react';

import { useSlider } from '..';
import { IconGoogle, IconFacebook } from '../icons';

type FooterProps = {
    type: 'login' | 'signup';
};

const Footer: FC<FooterProps> = ({ type }) => {
    const { next, previous } = useSlider();

    return (
        <>
            <div className="w-full flex justify-center items-center before:w-10 before:h-px before:mr-2 before:bg-gray-300 after:w-10 after:h-px after:ml-2 after:bg-gray-300 text-gray-300">
                <h6>Or {type === 'login' ? 'log in' : 'sign up'} with</h6>
            </div>
            <div className="w-full flex gap-7 justify-center">
                <a href="" className="p-2.5 rounded-xl border">
                    <IconGoogle />
                </a>
                <a href="" className="p-2.5 rounded-xl border">
                    <IconFacebook />
                </a>
            </div>
            <div className="w-full flex justify-center items-center">
                <h6>
                    {type === 'login'
                        ? `Don't have account? `
                        : `Already a member? `}
                </h6>{' '}
                <button
                    onClick={type === 'login' ? next : previous}
                    className="px-2 py-1"
                >
                    <h6 className="text-amber-500">
                        {' '}
                        {type === 'login' ? 'Sign up' : 'Log in'}
                    </h6>
                </button>
            </div>
        </>
    );
};

export default Footer;
