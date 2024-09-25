import { type FC } from 'react';

import { useSliderContext } from '@contexts';
import Icon from '@icons';

const ControlPanel: FC<{ variant: 'login' | 'signup' }> = ({ variant }) => {
    const { previous, next } = useSliderContext();
    const { panel, button, question } = {
        login: {
            panel: 'log in',
            button: 'Sign up',
            question: `Don't have account?`,
        },
        signup: {
            panel: 'sign up',
            button: 'Log in',
            question: 'Already have an account?',
        },
    }[variant];

    const handleClick = {
        login: next,
        signup: previous,
    }[variant];

    return (
        <>
            <div className="flex w-full items-center justify-center text-gray-300 before:mr-2 before:h-px before:w-10 before:bg-gray-300 after:ml-2 after:h-px after:w-10 after:bg-gray-300">
                <h6>Or {panel} with</h6>
            </div>
            <div className="flex w-full justify-center gap-7">
                <a href="" className="rounded-xl border p-2.5">
                    <Icon name="Google" />
                </a>
                <a href="" className="rounded-xl border p-2.5">
                    <Icon name="Facebook" />
                </a>
            </div>
            <div className="flex w-full items-center justify-center">
                <h6>{question}</h6>
                <button onClick={handleClick} className="px-2 py-1">
                    <h6 className="text-amber-500">{button}</h6>
                </button>
            </div>
        </>
    );
};

export default ControlPanel;
