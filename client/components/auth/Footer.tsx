import { type FC } from 'react';

import { useSliderContext } from '@contexts';
import { IconFacebook, IconGoogle } from '@icons';

type FooterProps = {
    type: 'login' | 'signup';
};

const Footer: FC<FooterProps> = () => {
    const { step, next, previous } = useSlider();

    return (
        <>
            <div className="flex w-full items-center justify-center text-gray-300 before:mr-2 before:h-px before:w-10 before:bg-gray-300 after:ml-2 after:h-px after:w-10 after:bg-gray-300">
                <h6>Or {step === 0 ? 'log in' : 'sign up'} with</h6>
            </div>
            <div className="flex w-full justify-center gap-7">
                <a href="" className="rounded-xl border p-2.5">
                    <IconGoogle />
                </a>
                <a href="" className="rounded-xl border p-2.5">
                    <IconFacebook />
                </a>
            </div>
            <div className="flex w-full items-center justify-center">
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
