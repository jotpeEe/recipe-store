/* eslint-disable consistent-return */
import { CLDN_API_URL } from '@constants';

/**
 * UploadImage abstracted logic for form components requiring cloudinary image upload.
 */
const uploadImage = async (
    file: File | undefined
): Promise<string | undefined> => {
    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'recipe-store');

    const data = await fetch(CLDN_API_URL, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .catch();

    return data.secure_url;
};

export default uploadImage;
