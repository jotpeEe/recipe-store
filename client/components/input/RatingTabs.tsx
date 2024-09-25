import { type FC } from 'react';

import { useFormContext } from 'react-hook-form';

import Icon from '@components/icons';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    Tabs,
    TabsList,
    TabsTrigger,
} from '@components/ui';
import { type ListsDisplayFilters } from '@features/Profile/ListsDisplay';

const RatingTabs: FC<{ message?: string }> = ({ message }) => {
    const { control, setValue } = useFormContext<ListsDisplayFilters>();
    const values = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <FormField
            name={'recipes.rating'}
            control={control}
            render={({ field }) => (
                <FormItem className="-mt-1.5">
                    <HoverCard>
                        <HoverCardTrigger>
                            <FormLabel>Rating</FormLabel>
                            <Tabs
                                value={`${field.value}`}
                                defaultValue={`${values}`}
                                onValueChange={value =>
                                    setValue(
                                        'recipes.rating',
                                        parseInt(value, 10)
                                    )
                                }
                                className="mt-2"
                            >
                                <TabsList className="flex flex-wrap">
                                    <FormControl>
                                        <>
                                            {values.map(value => (
                                                <TabsTrigger
                                                    key={value}
                                                    value={`${value}`}
                                                >
                                                    <div className="flex">
                                                        {Array.from(
                                                            { length: value },
                                                            (_, index) => (
                                                                <Icon
                                                                    key={index}
                                                                    name="Star"
                                                                    className="h-2 w-2"
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </TabsTrigger>
                                            ))}
                                        </>
                                    </FormControl>
                                </TabsList>
                            </Tabs>
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
        />
    );
};

export default RatingTabs;
