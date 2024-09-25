import { type FC, type MouseEvent, type ReactNode, useCallback } from 'react';

import { useFormContext } from 'react-hook-form';

import Icon from '@components/icons';
import Separator from '@components/ui/separator';
import { cn } from '@lib/utils';

import { type ListsDisplayFilters } from './ListsDisplay';

type FilterPanelProps = {
    target: keyof Pick<ListsDisplayFilters, 'recipes' | 'reviews'>;
    children: ReactNode;
    className?: string;
};

const FilterPanel: FC<FilterPanelProps> = ({ children, target, className }) => {
    const { resetField } = useFormContext<ListsDisplayFilters>();

    const handleClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
        resetField(target);
        resetField('search');
    }, []);

    return (
        <>
            <div className="flex flex-col gap-6 pt-6">
                <Separator />
                <div
                    className={cn(
                        'col-span-4 grid gap-4 children:self-start',
                        className || 'grid-cols-fill'
                    )}
                >
                    {children}
                </div>
                <Separator />
                <div className="flex h-full w-fit items-start justify-end">
                    <button
                        className="flex  cursor-pointer items-center justify-start gap-2 text-primary"
                        onClick={handleClick}
                    >
                        <Icon name="Clear" className="stroke-4 h-4 w-4" />
                        <p className="text-sm font-bold">Reset filters</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterPanel;
