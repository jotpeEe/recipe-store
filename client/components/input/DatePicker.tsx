/* eslint-disable no-nested-ternary */
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';

import {
    Button,
    Calendar,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@components/ui';
import { type ListsDisplayFilters } from '@features/Profile/ListsDisplay';
import { cn } from '@lib/utils';

const DatePicker = () => {
    const { control } = useFormContext<ListsDisplayFilters>();

    return (
        <FormField
            control={control}
            name="reviews.date"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>From</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-fit min-w-[250px] justify-start text-left font-normal',
                                        !field.value && 'text-muted'
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field?.value?.from ? (
                                        field?.value?.to ? (
                                            <>
                                                {format(
                                                    field?.value?.from,
                                                    'LLL dd, y'
                                                )}{' '}
                                                -{' '}
                                                {format(
                                                    field?.value?.to,
                                                    'LLL dd, y'
                                                )}
                                            </>
                                        ) : (
                                            format(
                                                field?.value?.from,
                                                'LLL dd, y'
                                            )
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={field?.value?.to}
                                selected={field.value}
                                onSelect={e => {
                                    const now = new Date();
                                    e?.to?.setHours(now.getHours());
                                    e?.to?.setMinutes(now.getMinutes());
                                    field.onChange(e);
                                }}
                                disabled={date =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                }
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DatePicker;
