import { useCallback, useEffect, useMemo } from 'react';

import {
    type FieldArrayWithId,
    useFieldArray,
    useFormContext,
} from 'react-hook-form';

import { useRecipeContext } from '@contexts';
import {
    type IngredientInput,
    type StepInput,
    type UpdateInput,
} from '@generated/graphql';
import Icon from '@icons';

type ItemInput = IngredientInput | StepInput;

export const checkStringProperties = <T extends ItemInput>(
    obj: T,
    omit?: string
): boolean => {
    const keys = Object.keys(obj);

    let result = true;
    keys.forEach(key => {
        if (
            typeof (obj as any)[key] === 'string' &&
            (obj as any)[key].length === 0 &&
            (obj as any)[key] !== omit
        ) {
            result = false;
        }
    });

    return result;
};

const useCrudOperations = <T extends 'ingredients' | 'steps'>(name: T) => {
    const initialItemState = {
        ingredients: {
            name: '',
            amount: '',
            edit: true,
        },
        steps: {
            label: '',
            text: '',
            edit: true,
        },
    }[name];

    const {
        control,
        handleSubmit,
        watch,
        formState: { isDirty },
    } = useFormContext<UpdateInput>();

    const { fields, insert, append, remove, update } = useFieldArray<
        UpdateInput,
        any,
        'id'
    >({
        control,
        name,
    });

    const {
        withEdit,
        isTheSameUser,
        onSubmit,
        isEnterPressed,
        isClickedOutside,
    } = useRecipeContext();

    const menu = useMemo(
        () => [
            {
                icon: <Icon name="Add" className="h-4" />,
                tooltip: 'Add one below',
            },
            {
                icon: <Icon name="Edit" className="h-4" />,
                tooltip: 'Edit',
            },
            {
                icon: <Icon name="Delete" className="h-4" />,
                tooltip: 'Delete',
                confirm: true,
            },
        ],
        []
    );

    const watchFields = watch(name);

    const handleDropdownSelect = useMemo(
        () => (clicked: number, itemId?: number) => {
            if (itemId !== undefined && watchFields) {
                const action = {
                    0: () => {
                        insert(itemId + 1, initialItemState);
                    },
                    1: () => {
                        update(itemId, {
                            ...watchFields[itemId],
                            edit: true,
                        });
                    },
                    2: () => {
                        remove(itemId);
                        if (onSubmit) handleSubmit(onSubmit)();
                    },
                }[clicked];
                action?.();
            }
        },
        [watchFields]
    );

    const editIndexes = useMemo(() => {
        const map: number[] = [];

        fields.forEach((field: any, index) => {
            if (field.edit === true) {
                map.push(index);
            }
        });

        return map;
    }, [fields]);

    const edit = isTheSameUser && withEdit;

    const updateFields = useCallback(() => {
        const isValid = onSubmit && edit && isDirty && watchFields;
        if (isValid) {
            editIndexes.forEach(index => {
                const isEmpty = checkStringProperties(
                    watchFields[index],
                    name === 'steps' ? 'label' : undefined
                );

                if (isEmpty) {
                    update(index, {
                        ...watchFields[index],
                        edit: false,
                    });
                } else {
                    remove(index);
                }
            });
        }
    }, [isDirty, watchFields, edit, onSubmit]);

    useEffect(() => {
        updateFields();
    }, [isEnterPressed, isClickedOutside]);

    const handleRemoveItem = useCallback((index: number) => {
        remove(index);
    }, []);

    const handleAppendItem = useCallback(() => {
        append(initialItemState);
    }, []);

    return {
        fields: fields as FieldArrayWithId<UpdateInput, T, 'id'>[],
        handleRemoveItem,
        handleAppendItem,
        dropdownProps: {
            options: menu,
            onSelect: handleDropdownSelect,
        },
    };
};

export default useCrudOperations;
