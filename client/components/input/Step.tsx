import { type FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { type UpdateInput } from '@generated/graphql';

import Input from './Input';
import TextArea from './TextArea';

type StepInputProps = {
    index: number;
    defaultValues?: {
        label?: string | undefined | null;
        text?: string;
    };
};

const StepInput: FC<StepInputProps> = ({ index, defaultValues }) => {
    const { register } = useFormContext<UpdateInput>();

    return (
        <>
            <Input
                placeholder={`ex. Step ${index + 1} header (optional)`}
                defaultValue={`${defaultValues?.label}`}
                {...register(`steps.${index}.label`)}
                small
                noValidation
                ref={null}
            />
            <TextArea
                placeholder={`Step ${index + 1} description`}
                defaultValue={`${defaultValues?.text}`}
                {...register(`steps.${index}.text`)}
                small
                noValidation
                ref={null}
            />
        </>
    );
};

export default StepInput;
