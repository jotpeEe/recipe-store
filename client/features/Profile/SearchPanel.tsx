import {
    type FC,
    type MouseEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import cn from 'classnames';
import { type FieldValues, useFormContext } from 'react-hook-form';

import Button from '@components/Button';
import Icon from '@components/icons';
import { Input } from '@components/input';
import ComboBox from '@components/input/ComboBox';
import DatePicker from '@components/input/DatePicker';
import RatingTabs from '@components/input/RatingTabs';
import Slider from '@components/input/Slider';
import { Separator, Tabs, TabsList, TabsTrigger } from '@components/ui';
import { Badge } from '@components/ui/badge';
import { type ListsDisplayFilters } from '@features/Profile/ListsDisplay';
import useIsInViewport from 'client/hooks/useIsInViewport';

import FilterPanel from './FilterPanel';

type SearchPanelProps = {
    ingredients: string[] | undefined;
    cuisines: string[] | undefined;
    users?: string[] | undefined;
};

const useCountFilters = <T extends FieldValues>(
    prop: keyof Pick<T, 'recipes' | 'reviews'>,
    values: T
) => {
    const {
        formState: { defaultValues },
    } = useFormContext<T>();

    return useMemo(() => {
        const props = defaultValues?.[prop];
        const value = values?.[prop];
        const filteredVaues = new Set<string>([]);
        if (props) {
            Object.keys(value).forEach(
                key =>
                    value[key as keyof typeof props] !==
                        props[key as keyof typeof props] &&
                    filteredVaues.add(key)
            );
        }

        return filteredVaues;
    }, [defaultValues, values]);
};

const SearchPanel: FC<SearchPanelProps> = ({
    ingredients,
    cuisines,
    users,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [menuViewHeight, setMenuViewHeight] = useState<number | null>(null);
    const { setValue, watch, getValues } =
        useFormContext<ListsDisplayFilters>();

    const menuStatusState = watch('menuStatus');
    const values = getValues();

    const isInViewport = useIsInViewport(menuRef, {
        rootMargin: '0% 0% -90% 0%',
    });

    const MenuView = useMemo(
        () =>
            ({
                idle: () => null,
                recipes: () => (
                    <FilterPanel target="recipes">
                        <ComboBox
                            name="recipes.ingredient"
                            options={ingredients}
                        />
                        <ComboBox name="recipes.cuisine" options={cuisines} />
                        <Slider
                            name="recipes.time"
                            message="Filter aproximately time needed to make the dish."
                        />
                        <RatingTabs message="Filter by recipe rating." />
                    </FilterPanel>
                ),
                reviews: () => (
                    <FilterPanel
                        className="grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]"
                        target="reviews"
                    >
                        <DatePicker />
                        {users && (
                            <ComboBox name="reviews.user" options={users} />
                        )}
                    </FilterPanel>
                ),
            }[menuStatusState]),
        [menuStatusState, ingredients, cuisines, users]
    );

    const options = [
        {
            label: 'recipes',
            selectedValues: useCountFilters('recipes', values),
        },
        {
            label: 'reviews',
            selectedValues: useCountFilters('reviews', values),
        },
    ];

    useEffect(() => {
        if (dropdownRef.current) {
            setMenuViewHeight(dropdownRef.current.clientHeight);
        } else {
            setMenuViewHeight(null);
        }
    }, [menuStatusState]);

    const handleChange = (status: typeof menuStatusState, e?: MouseEvent) => {
        e?.preventDefault();

        if (menuStatusState === status) {
            setOpen(prev => !prev);
        } else {
            setOpen(true);
            setValue('menuStatus', status);
        }
    };

    const inputPlaceholder = `Search ${menuStatusState}`;

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0">
            <div
                className={cn(
                    'absolute left-0 right-0 bottom-0 top-0 z-40 bg-gray-800 opacity-50',
                    open ? '' : 'hidden'
                )}
            />
            <div
                className={cn(
                    'sticky top-0 z-50 transition-transform duration-200 ease-in-out sm:top-16'
                )}
            >
                <div className="absolute left-0 top-0 right-0 bottom-auto z-10 -mt-4 bg-white sm:h-14" />
                <div
                    className={cn(
                        'absolute left-0 top-0 bottom-auto z-40 mt-10 h-20 w-full bg-gray-100 opacity-0 shadow-md transition-opacity duration-300',
                        isInViewport && 'opacity-100'
                    )}
                />
                <div
                    ref={menuRef}
                    className={cn(
                        'relative z-50 mx-auto flex max-w-7xl flex-col rounded-xl bg-white py-5 px-6 shadow-card',
                        isInViewport && 'rounded-t-none'
                    )}
                >
                    <div className="grid h-full grid-cols-1 gap-2 sm:flex sm:items-center sm:justify-between">
                        <div className="flex h-full items-center gap-2 pr-0 sm:col-span-3 sm:pr-4 md:gap-4 md:pr-0">
                            <Input
                                icon={{ name: 'Search', position: 'start' }}
                                name="search"
                                onFocus={() => setOpen(false)}
                                placeholder={inputPlaceholder}
                                noValidation
                                small
                            />
                            <Button
                                className="hidden h-full md:flex"
                                href="/create"
                                size="sm"
                            >
                                New recipe
                            </Button>
                            <Button
                                className="flex p-1.5 sm:p-2 md:hidden"
                                href="/create"
                                size="custom"
                                icon={<Icon name="Add" className="h-4 w-4" />}
                            />
                        </div>
                        <div className="flex h-fit w-full items-center justify-end gap-4 sm:col-start-[-1] sm:h-full sm:w-fit ">
                            <Tabs defaultValue="recipes" className="w-full">
                                <TabsList className="w-full space-x-1">
                                    {options.map(
                                        ({ label, selectedValues }, index) => (
                                            <TabsTrigger
                                                key={index}
                                                className="flex h-8 w-full gap-2 text-xs sm:w-fit"
                                                value={label}
                                                onClick={e => {
                                                    handleChange(
                                                        label as typeof menuStatusState,
                                                        e
                                                    );
                                                }}
                                            >
                                                {label.charAt(0).toUpperCase() +
                                                    label.slice(1)}
                                                {selectedValues?.size > 0 && (
                                                    <>
                                                        <Separator
                                                            orientation="vertical"
                                                            className="mx-2 h-4"
                                                        />
                                                        <Badge
                                                            variant="secondary"
                                                            className="rounded-sm px-1 font-normal lg:hidden"
                                                        >
                                                            {
                                                                selectedValues.size
                                                            }
                                                        </Badge>
                                                        <div className="hidden space-x-1 lg:flex">
                                                            {selectedValues.size >
                                                            2 ? (
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="rounded-sm px-1 font-normal"
                                                                >
                                                                    {
                                                                        selectedValues.size
                                                                    }{' '}
                                                                    selected
                                                                </Badge>
                                                            ) : (
                                                                Array.from(
                                                                    selectedValues
                                                                ).map(key => (
                                                                    <Badge
                                                                        variant="secondary"
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="rounded-sm px-1 font-normal"
                                                                    >
                                                                        {key}
                                                                    </Badge>
                                                                ))
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </TabsTrigger>
                                        )
                                    )}
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                    <div
                        className={cn(
                            'relative left-0 top-0 h-0 w-full overflow-hidden transition-all duration-300 ease-in-out'
                        )}
                        style={{
                            height: open ? `${menuViewHeight}px` : '0px',
                        }}
                    >
                        <div ref={dropdownRef}>
                            <MenuView />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;
