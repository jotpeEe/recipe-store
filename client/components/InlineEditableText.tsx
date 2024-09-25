import React, {
    type FC,
    type PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { useRecipeContext } from '@contexts';

import Input from './input/Input';
import TextArea from './input/TextArea';

type InlineEditableText = PropsWithChildren & {
    name: string;
    type?: 'input' | 'inputNumber' | 'textarea';
};

const TextWithInput: FC<InlineEditableText> = ({
    children,
    name,
    type = 'input',
}) => {
    const [editMode, setEditmode] = useState(false);
    const { isClickedOutside, isEnterPressed } = useRecipeContext();

    const InputElement = useCallback(
        () =>
            ({
                input: <Input name={name} small noValidation />,
                textarea: <TextArea name={name} small noValidation />,
                inputNumber: (
                    <Input name={name} small noValidation type="number" />
                ),
            }[type]),
        [type]
    );

    useEffect(() => {
        if (isClickedOutside) setEditmode(false);
    }, [isClickedOutside, isEnterPressed]);

    return (
        <>
            {editMode ? (
                <InputElement />
            ) : (
                <div onClick={() => setEditmode(true)}>{children}</div>
            )}
        </>
    );
};

export default TextWithInput;
