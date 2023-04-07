import {
    type ChangeEvent,
    type FC,
    type MouseEvent,
    useCallback,
    useRef,
} from 'react';

import { Controller, useController, useFormContext } from 'react-hook-form';

import Button from '@components/Button';
import { IconImage } from '@components/icons';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@constants';
import { uploadImage } from '@lib';

import ErrorMessage from './ErrorMessage';

type ImageInputProps = {
    name: string;
    instantUpload?: boolean;
};

const ImageInput: FC<ImageInputProps> = ({ name, instantUpload }) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const { ref, ...rest } = register('image');

    const { field } = useController({ name });

    const onImageUpload = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) return;

            const file = e.target.files[0];
            let isValid = true;

            if (file.size > MAX_IMAGE_SIZE) {
                setError('image', {
                    type: 'custom',
                    message: 'Max image size is 500kb',
                });
                isValid = false;
            }

            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setError('image', {
                    type: 'custom',
                    message:
                        'Only .jpg, .jpeg, .png and .webp formats are supported',
                });
                isValid = false;
            }

            if (isValid) {
                clearErrors('image');
                const data = await uploadImage(file);
                field.onChange(data);
            }
        },
        [field]
    );

    const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (inputFileRef.current) inputFileRef.current.click();
    }, []);

    return (
        <>
            <div className="mb-2 flex items-center">
                {instantUpload ? (
                    <Controller
                        name={name}
                        control={control}
                        render={({
                            field: { name: fieldName, onBlur, ref: fieldRef },
                        }) => (
                            <input
                                ref={e => {
                                    fieldRef(e);
                                    inputFileRef.current = e;
                                }}
                                name={fieldName}
                                onBlur={onBlur}
                                onChange={onImageUpload}
                                className="hidden"
                                type="file"
                                multiple={false}
                                accept="image/jpg, image/png, image/jpeg, image/webp"
                            />
                        )}
                    />
                ) : (
                    <input
                        {...rest}
                        name={name}
                        ref={e => {
                            ref(e);
                            inputFileRef.current = e;
                        }}
                        className="hidden"
                        type="file"
                        multiple={false}
                        accept="image/jpg, image/png, image/jpeg, image/webp"
                    />
                )}
                <Button
                    variant="input"
                    type="button"
                    icon={<IconImage />}
                    onClick={handleClick}
                    size="sm"
                >
                    Add image
                </Button>
            </div>
            <ErrorMessage error={errors[name]} />
        </>
    );
};

export default ImageInput;
