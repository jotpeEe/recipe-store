import React, {
    type ChangeEventHandler,
    type FC,
    useEffect,
    useState,
} from 'react';

import cn from 'classnames';

import Button from '@components/Button';
import { IconCopy, IconCorrect } from '@components/icons';
import { HOST_URL } from '@constants';
import { useRecipeContext } from '@contexts';

const RecipeLink: FC = () => {
    const { id } = useRecipeContext();
    const defaultValue = `${HOST_URL}recipes/${id}`;
    const [input, setInput] = useState<string>(defaultValue);
    const [copiedText, setCopiedText] = useState(false);

    const copyToClipboard = () => {
        if (input.length > 0) {
            navigator.clipboard
                .writeText(input)
                .then(() => {
                    setCopiedText(true);
                })
                .catch(error => {
                    console.error('Error copying text: ', error);
                });
        }
    };

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        setInput(e.target.value);
    };

    useEffect(() => {
        const clear = setTimeout(() => setCopiedText(false), 1500);

        return () => clearTimeout(clear);
    }, [copiedText]);

    return (
        <div className="flex h-fit w-fit min-w-max flex-col items-start justify-center rounded-3xl border bg-white p-4 drop-shadow children:py-1.5">
            <h3 className="text-xl font-bold">Recipe link</h3>
            <p className="max-w-[38ch] text-xs">
                Copy recipe link and share your recipe link with friends and
                family.
            </p>
            <div className="flex w-full items-center">
                <input
                    defaultValue={defaultValue}
                    className="flex w-full items-center justify-start rounded-lg bg-neutral-200 p-3 text-xs outline-0"
                    onChange={onChange}
                />
                <Button
                    className={cn(
                        'ml-[-10px]',
                        copiedText && 'border-yellow-500'
                    )}
                    size="lg"
                    onClick={copyToClipboard}
                    message={{ text: 'Copied', active: copiedText }}
                >
                    {copiedText ? <IconCorrect /> : <IconCopy />}
                </Button>
            </div>
        </div>
    );
};

export default RecipeLink;
