import { useMemo } from 'react';

import { type UseFormWatch } from 'react-hook-form';

import { useDebouncedValue } from '@hooks';

import { type ListsDisplayFilters, type RecipeListProps } from './ListsDisplay';

const useReviewFilter = (
    watch: UseFormWatch<ListsDisplayFilters>,
    reviews?: RecipeListProps['reviews']
) => {
    const search = watch('search');
    const menuStatus = watch('menuStatus');
    const { date, user } = watch('reviews');
    const debouncedSearch = useDebouncedValue(search, 100);

    const filteredReviews = useMemo(() => {
        if (menuStatus === 'reviews') {
            const searchTerm = debouncedSearch?.toLowerCase() || '';
            const fromDate = date?.from;
            const toDate = date?.to;
            const userFilter = user?.toLowerCase();

            return reviews?.filter(review => {
                const createdAt = new Date(review.createdAt);
                const userName = review.user.name.toLowerCase();

                const matchesSearch = userName.includes(searchTerm);

                const matchesUserFilter =
                    !userFilter || userName.includes(userFilter);

                const isAfterDate = !fromDate || createdAt >= fromDate;

                const isWithinDateRange = !toDate || createdAt <= toDate;

                return (
                    matchesSearch &&
                    matchesUserFilter &&
                    isAfterDate &&
                    isWithinDateRange
                );
            });
        }

        return reviews;
    }, [date, user, reviews, debouncedSearch, menuStatus]);

    return filteredReviews;
};

export default useReviewFilter;
