import { FC, useCallback, SyntheticEvent } from 'react';

import { Controller, useController, useFormContext } from 'react-hook-form';

import { ErrorMessage, Spinner } from '@components';
import { CLDN_API_URL } from '@constants';
import { useAppSelector } from '@hooks';

type ImageUploadProps = {
    name: string;
};

const ImageUpload: FC<ImageUploadProps> = ({ name }) => {
    const uploadingImage = useAppSelector(state => state.status.imageUploading);

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const { field } = useController({ name, control });

    const onImageUpload = useCallback(
        async (e: SyntheticEvent<EventTarget>) => {
            const target = e.target as HTMLInputElement;
            if (!target.files || target.files.length === 0) return;
            const newFile = Object.values(target.files).map(
                (file: File) => file
            );
            const formData = new FormData();
            formData.append('file', newFile[0]);
            formData.append('upload_preset', 'recipe-store');

            const data = await fetch(CLDN_API_URL, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                });

            if (data.secure_url) {
                field.onChange(data.secure_url);
            }
        },
        [field]
    );

    return (
        <Controller
            name={name}
            defaultValue=""
            control={control}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            render={({ field: { name, onBlur, ref } }) => (
                <>
                    <div className="mb-2 flex justify-between items-center">
                        <div>
                            <input
                                className="text-xs text-amber-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0  file:shadow-border file:text-xs file:bg-white file:text-gray-400 "
                                type="file"
                                name={name}
                                onBlur={onBlur}
                                ref={ref}
                                onChange={onImageUpload}
                                multiple={false}
                                accept="image/jpg, image/png, image/jpeg"
                            />
                        </div>
                        <div>
                            {uploadingImage && (
                                <Spinner color="text-yellow-400" />
                            )}
                        </div>
                    </div>
                    <ErrorMessage error={errors[name]} />
                </>
            )}
        />
    );
};

export default ImageUpload;
