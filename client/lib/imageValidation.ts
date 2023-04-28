import { type RefinementCtx } from 'zod';

import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@constants';

/**
 * Callback for zod image validation, tests file type (.jpg, .jpeg, .png, .webp) and it's size.
 *
 * @param f File on which validation will be executed
 * @param ctx zod RefinementCtx
 *
 * @returns boolean
 *
 */

const imageValidation = (f: FileList | undefined, ctx: RefinementCtx) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(f?.[0]?.type)) {
        ctx.addIssue({
            code: 'custom',
            message: 'Only .jpg, .jpeg, .png and .webp formats are supported',
        });
    }
    if (f && f?.[0]?.size >= MAX_IMAGE_SIZE) {
        ctx.addIssue({
            code: 'custom',
            message: 'Max image size is 500kb',
        });
    }
};

export default imageValidation;
