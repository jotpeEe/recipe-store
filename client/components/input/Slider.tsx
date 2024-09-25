import * as React from 'react';
import { type FC } from 'react';

import { useFormContext } from 'react-hook-form';

import {
    FormField,
    FormItem,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    Slider,
} from '@components/ui';
import { type ListsDisplayFilters } from '@features/Profile/ListsDisplay';

export const SliderInput: FC<{
    name: 'recipes.time';
    message?: string;
}> = ({ name, message }) => {
    const { control, setValue } = useFormContext<ListsDisplayFilters>();

    const parseName = () => {
        const nameProp = name.split('.')[1];
        return nameProp.charAt(0).toUpperCase() + nameProp.slice(1);
    };

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className="-mt-1 grid gap-2">
                    <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <p>{parseName()}</p>
                                    <span className="text-muted-foreground w-20 rounded-md border border-transparent text-right text-xs text-gray-600 hover:border-border">
                                        {`${field.value} mins`}
                                    </span>
                                </div>
                                <Slider
                                    id={name}
                                    max={240}
                                    defaultValue={[field.value]}
                                    step={10}
                                    onValueChange={e => setValue(name, e[0])}
                                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                                />
                            </div>
                        </HoverCardTrigger>
                        {message && (
                            <HoverCardContent
                                align="start"
                                className="w-[260px] text-sm"
                                side="bottom"
                            >
                                {message}
                            </HoverCardContent>
                        )}
                    </HoverCard>
                </FormItem>
            )}
        ></FormField>
    );
};

export default SliderInput;
