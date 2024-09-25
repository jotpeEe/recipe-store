import React, {
    type FC,
    type HTMLAttributes,
    type MouseEvent,
    type PropsWithChildren,
    useMemo,
    useRef,
    useState,
} from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { RecipeList, ReviewList } from '@components';
import Icon, { type IconNames } from '@components/icons';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Form,
    Tabs,
    TabsList,
    TabsTrigger,
} from '@components/ui';
import SearchPanel from '@features/Profile/SearchPanel';
import { type GetProfileDataQueryQuery } from '@generated/graphql';
import { useAppSelector } from '@hooks';
import { cn } from '@lib/utils';
import useIsInViewport from 'client/hooks/useIsInViewport';

import useRecipeFilter from './useRecipeFilter';
import useReviewFilter from './useReviewFilter';

export type RecipeListProps = {
    recipes?: GetProfileDataQueryQuery['getRecipes']['recipes'];
    reviews?: GetProfileDataQueryQuery['getMyReviews']['reviews'];
    bookmarks?: GetProfileDataQueryQuery['getAllBookmarkedRecipes']['recipes'];
};

const searchPanelSchema = z.object({
    recipes: z.object({
        cuisine: z.string(),
        ingredient: z.string().optional(),
        time: z.number(),
        rating: z.number(),
    }),
    search: z.string().optional(),
    menuStatus: z.enum(['recipes', 'reviews']),
    recipeMode: z.enum(['owned', 'copied']),
    reviewMode: z.enum(['mine', 'others']),
    reviews: z.object({
        date: z
            .object({
                from: z.date(),
                to: z.date(),
            })
            .optional(),
        user: z.string().optional(),
    }),
});

export type ListsDisplayFilters = z.infer<typeof searchPanelSchema>;

const defaultValues = {
    recipes: {
        cuisine: undefined,
        ingredient: undefined,
        time: 0,
        rating: 0,
    },
    search: undefined,
    menuStatus: 'recipes' as ListsDisplayFilters['menuStatus'],
    recipeMode: 'owned' as ListsDisplayFilters['recipeMode'],
    reviewMode: 'mine' as ListsDisplayFilters['reviewMode'],
    reviews: {
        date: undefined,
        user: undefined,
    },
};

type ListProps = {
    description?: string;
    items: number;
    options: {
        icon: IconNames;
        value: string;
    }[];
    onTabsStateChange?: (newState: string) => void;
    title?: string;
};

const List = React.forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & PropsWithChildren & ListProps
>(
    (
        {
            children,
            title,
            description,
            options,
            items,
            onTabsStateChange,
            ...props
        },
        ref
    ) => {
        const listRef = useRef<HTMLDivElement | null>(null);
        const [showAll, setShowAll] = useState(false);
        const isInViewportTop = useIsInViewport(listRef, {
            rootMargin: '0% 0% -60% 0%',
        });

        const isInViewportBottom = useIsInViewport(listRef, {
            rootMargin: '-95% 0% 0% 0%',
        });

        const isInViewport = isInViewportBottom && isInViewportTop;

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            setShowAll(s => !s);
        };

        const limit = useMemo(() => {
            const element = listRef.current;

            if (element) {
                const { paddingLeft, paddingRight } =
                    window.getComputedStyle(element);

                const gap = 16; // Adjust this value based on your needs

                const horizontalSpace: number =
                    parseFloat(paddingLeft) + parseFloat(paddingRight) + gap;

                const listWidth = element.offsetWidth - horizontalSpace;

                const itemsPerRow = Math.floor(listWidth / 200);

                const res = 3 * itemsPerRow;

                return res;
            }

            return undefined;
        }, [listRef.current, items]);

        return (
            <>
                <Card ref={ref} {...props}>
                    <CardHeader className="flex flex-row justify-between">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>
                        <Tabs
                            className="z-10"
                            defaultValue={options[0].value}
                            onValueChange={value => {
                                onTabsStateChange?.(value);
                            }}
                        >
                            <TabsList>
                                {options.map(({ icon, value }, index) => (
                                    <TabsTrigger key={index} value={value}>
                                        <Icon name={icon} className="h-4 w-4" />
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent
                        ref={listRef}
                        className={cn(
                            'relative overflow-hidden',
                            !showAll && 'max-h-[32rem]'
                        )}
                    >
                        {children}
                        {limit && items > limit && (
                            <div
                                className={cn(
                                    'absolute inset-x-0 -bottom-5 z-20 flex justify-center pt-14 pb-8 ',
                                    !showAll && 'bg-gradient-to-t from-white'
                                )}
                            >
                                {!showAll && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={cn(
                                            'h-8',
                                            showAll
                                                ? 'border-dotted border-black bg-white text-black'
                                                : 'border-none bg-black text-white'
                                        )}
                                        onClick={handleClick}
                                    >
                                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                                        Show more...
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
                {showAll && (
                    <div
                        className={cn(
                            'pointer-events-none fixed bottom-16 z-20 grid w-full max-w-7xl grid-cols-1 gap-6 self-center sm:bottom-5 sm:mt-0 md:grid-cols-5 lg:grid-cols-3'
                        )}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                'pointer-events-none mx-auto h-8 w-fit translate-y-3 border-dotted border-black bg-white text-black opacity-0 transition',
                                isInViewport &&
                                    'pointer-events-auto translate-y-0 opacity-100',
                                props.className
                            )}
                            onClick={handleClick}
                        >
                            <MinusCircledIcon className="mr-2 h-4 w-4" />
                            Show less...
                        </Button>
                    </div>
                )}
            </>
        );
    }
);

const ResetSearchButton: FC<{
    target: keyof typeof defaultValues;
    className?: string;
}> = ({ target, className }) => {
    const { resetField } = useFormContext<ListsDisplayFilters>();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetField(target);
        resetField('search');
    };

    return (
        <div
            className={cn(
                'flex min-h-[450px] flex-col items-center justify-center gap-3',
                className
            )}
        >
            <p className="text-center">No {target} matching your search.</p>
            <button
                className="z-20  flex cursor-pointer items-center justify-start gap-2 text-primary"
                onClick={handleClick}
            >
                <Icon name="Clear" className="stroke-4 h-4 w-4" />
                <p className="text-sm font-bold">Reset search</p>
            </button>
        </div>
    );
};

const getArrayState = (array?: unknown[]) => {
    const res = array?.length !== 0 ? 'notEmpty' : 'empty';

    return res;
};

const useUniqueCuisinesAndIngredients = (
    recipes?: GetProfileDataQueryQuery['getRecipes']['recipes']
) => {
    const user = useAppSelector(state => state.auth.user);
    const result = useMemo(() => {
        const uniqueCuisines = new Set<string>();
        const uniqueIngredients = new Set<string>();
        const uniqueUsers = new Set<string>();
        const othersReviews: GetProfileDataQueryQuery['getRecipes']['recipes'][0]['reviews'] =
            [];

        recipes?.forEach(recipe => {
            if (recipe.cuisine) uniqueCuisines.add(recipe.cuisine);
            recipe?.ingredients?.forEach(ingredient =>
                uniqueIngredients.add(ingredient.name)
            );
            recipe.reviews.forEach(review => {
                if (review.user.id !== user?.id) {
                    othersReviews.push(review);
                }
            });
        });

        othersReviews.forEach(review => uniqueUsers.add(review?.user?.name));

        return {
            cuisines: Array.from(uniqueCuisines),
            ingredients: Array.from(uniqueIngredients),
            othersReviews,
            users: Array.from(uniqueUsers),
        };
    }, [recipes, user]);

    return result;
};

const ListsDisplay: FC<RecipeListProps> = ({ recipes, reviews, bookmarks }) => {
    const [recipeListState, setRecipeListState] = useState<string>('owned');
    const [reviewListState, setReviewListState] = useState<string>('mine');

    const {
        cuisines: recipeCuisines,
        ingredients: recipeIngredients,
        othersReviews,
        users,
    } = useUniqueCuisinesAndIngredients(recipes);
    const { cuisines: bookmarkCuisines, ingredients: bookmarkIngredients } =
        useUniqueCuisinesAndIngredients(bookmarks);

    const recipeList = useMemo(
        () =>
            ({
                owned: {
                    list: recipes,
                    cuisines: recipeCuisines,
                    ingredients: recipeIngredients,
                },
                copied: {
                    list: bookmarks,
                    cuisines: bookmarkCuisines,
                    ingredients: bookmarkIngredients,
                },
            }[recipeListState]),
        [recipes, recipeListState]
    );

    const reviewList = useMemo(
        () =>
            ({
                mine: {
                    list: reviews,
                },
                others: {
                    list: othersReviews,
                    users,
                },
            }[reviewListState]),
        [reviews, reviewListState]
    );

    const methods = useForm<ListsDisplayFilters>({
        defaultValues,
        resolver: zodResolver(searchPanelSchema),
    });

    const { watch } = methods;

    const filteredReviews = useReviewFilter(watch, reviewList?.list);
    const filteredRecipes = useRecipeFilter(watch, recipeList?.list);

    const recipeFeed: ListProps = useMemo(
        () => ({
            title: {
                owned: 'Your recipes',
                copied: 'Saved recipes',
            }[recipeListState],
            items: filteredRecipes?.length || 0,
            description: `You have ${filteredRecipes?.length} ${
                filteredRecipes?.length === 1 ? 'recipe' : 'recipes'
            }`,
            options: [
                { icon: 'List', value: 'owned' },
                { icon: 'Bookmark', value: 'copied' },
            ],
            onTabsStateChange: setRecipeListState,
        }),
        [filteredRecipes, recipeListState]
    );

    const reviewsFeed: ListProps = useMemo(
        () => ({
            title: {
                mine: 'Your reviews',
                others: 'People reviews',
            }[reviewListState],
            items: filteredReviews?.length || 0,
            description: `You have ${filteredReviews?.length} ${
                filteredReviews?.length === 1 ? 'review' : 'reviews'
            }`,
            options: [
                { icon: 'Person', value: 'mine' },
                { icon: 'Others', value: 'others' },
            ],
            onTabsStateChange: setReviewListState,
        }),
        [filteredReviews, reviewListState]
    );

    const recipesIsEmpty = getArrayState(filteredRecipes);
    const reviewsIsEmpty = getArrayState(filteredReviews);

    const RecipeView = useMemo(
        () =>
            ({
                empty: () => (
                    <ResetSearchButton
                        className="md:col-span-3 lg:col-span-2"
                        target="recipes"
                    />
                ),
                notEmpty: () => <RecipeList recipes={filteredRecipes} />,
            }[recipesIsEmpty]),
        [recipesIsEmpty, filteredRecipes]
    );

    const ReviewView = useMemo(
        () =>
            ({
                empty: () => (
                    <ResetSearchButton
                        className="md:col-span-2 lg:col-span-1"
                        target="reviews"
                    />
                ),
                notEmpty: () => <ReviewList reviews={filteredReviews} />,
            }[reviewsIsEmpty]),
        [reviewsIsEmpty, filteredReviews]
    );

    return (
        <section className="relative mt-6 mb-16 h-full sm:mb-0">
            <div className="mx-auto max-w-7xl">
                <div className="pt-[9.5rem] sm:pt-[6.5rem]">
                    <Form {...methods}>
                        <form>
                            <SearchPanel
                                cuisines={recipeList?.cuisines}
                                ingredients={recipeList?.ingredients}
                                users={reviewList?.users}
                            />
                            <div className="relative grid grid-cols-1 gap-6 sm:mt-0 md:grid-cols-5 lg:grid-cols-3">
                                <List
                                    className="md:col-span-3 lg:col-span-2"
                                    {...recipeFeed}
                                >
                                    <RecipeView />
                                </List>
                                <List
                                    className="md:col-span-2 md:col-start-4 lg:col-span-1 lg:col-start-3"
                                    {...reviewsFeed}
                                >
                                    <ReviewView />
                                </List>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ListsDisplay;
