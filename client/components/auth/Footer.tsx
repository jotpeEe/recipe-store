import { FC } from 'react';

import { useSlider } from '..';
import { IconGoogle, IconFacebook } from '../icons';

type FooterProps = {
    type: 'login' | 'signup';
};

const Footer: FC<FooterProps> = () => {
    const { step, next, previous } = useSlider();

    return (
        <>
            <div className="w-full flex justify-center items-center before:w-10 before:h-px before:mr-2 before:bg-gray-300 after:w-10 after:h-px after:ml-2 after:bg-gray-300 text-gray-300">
                <h6>Or {step === 0 ? 'log in' : 'sign up'} with</h6>
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
                    {step === 0 ? `Don't have account? ` : `Already a member? `}
                </h6>{' '}
                <button
                    onClick={step === 0 ? next : previous}
                    className="px-2 py-1"
                >
                    <h6 className="text-amber-500">
                        {' '}
                        {step === 0 ? 'Sign up' : 'Log in'}
                    </h6>
                </button>
            </div>
        </>
    );
};

export default Footer;
