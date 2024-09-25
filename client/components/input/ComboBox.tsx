import { type FC } from 'react';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { type FieldPath, useFormContext } from 'react-hook-form';

import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
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

const parseName = (key: string) => {
    const parts = key.split('.');
    return parts[1];
};

type ComboBoxProps = {
    name: FieldPath<ListsDisplayFilters>;
    options?: string[];
};

const ComboBox: FC<ComboBoxProps> = ({ name, options }) => {
    const { control, setValue } = useFormContext<ListsDisplayFilters>();
    const parsedName = parseName(name);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>
                        {`${
                            parsedName.charAt(0).toUpperCase() +
                            parsedName.slice(1)
                        }s`}
                    </FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        'w-[200px] justify-between',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value
                                        ? field.value.toString()
                                        : `Select ${parsedName}`}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder={`Search ${parsedName}...`}
                                    className="h-9"
                                />
                                <CommandEmpty>
                                    No {parsedName} found.
                                </CommandEmpty>
                                <CommandGroup>
                                    {options?.map((option, index) => (
                                        <CommandItem
                                            value={option}
                                            key={index}
                                            onSelect={() => {
                                                setValue(name, option);
                                            }}
                                        >
                                            {option}
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    option === field.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        This is the {parsedName} that will be used as a filter.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ComboBox;
