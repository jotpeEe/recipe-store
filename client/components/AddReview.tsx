import React, {
    type ChangeEvent,
    type FC,
    type MouseEvent,
    useRef,
    useState,
} from 'react';

import Icon from '@components/icons';
import { useCreateReviewMutation } from '@generated/graphql';
import { queryClient, requestClient } from '@requests';
import useCheckTextWidth from 'client/hooks/useCheckTextWidth';

import Spinner from './Spinner';

type AddReviewProps = {
    id?: string;
};

const AddReview: FC<AddReviewProps> = ({ id }) => {
    const textElementRef = useRef<HTMLTextAreaElement>(null);
    const [textareaValue, setTextareaValue] = useState('');
    const {
        style: { width, height, lines },
    } = useCheckTextWidth<HTMLTextAreaElement>(
        textElementRef,
        textareaValue,
        true
    );

    const { isLoading, mutate: createReview } = useCreateReviewMutation(
        requestClient,
        {
            onSuccess() {
                queryClient.refetchQueries({ queryKey: ['GetRecipeById', {}] });
                setTextareaValue('');
            },
        }
    );

    const handleButtonClick = (e?: MouseEvent) => {
        e?.preventDefault();
        const input = textareaValue;
        if (id && input.length !== 0)
            createReview({
                input,
                id,
            });
    };

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
    };

    return (
        <div
            onKeyDown={e => {
                if (e.key === 'Enter' && textareaValue.trim().length > 0) {
                    if (!e.shiftKey) {
                        e.preventDefault();
                        handleButtonClick();
                    }
                }
            }}
            className="shadow-xs dark:shadow-xs relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white py-[10px] md:py-4 md:pl-4"
        >
            <textarea
                ref={textElementRef}
                value={textareaValue}
                placeholder="Send a review."
                tabIndex={0}
                rows={1}
                onChange={e => {
                    handleTextareaChange(e);
                }}
                className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 pl-3 outline-0 placeholder:align-middle focus:ring-0 focus-visible:ring-0 md:pr-12 md:pl-0"
                style={{
                    height: `${lines ? lines * 24 : 24}px`,
                    overflowY: `${lines && lines < 6 ? 'hidden' : 'auto'}`,
                }}
            />
            <button
                onClick={handleButtonClick}
                className="absolute right-2 bottom-2.5 rounded-md bg-primary p-1 text-white transition-colors disabled:bg-transparent disabled:text-gray-400 disabled:opacity-40 md:bottom-3 md:right-3 md:p-2"
                disabled={textareaValue.trim().length === 0}
            >
                <span>
                    {!isLoading ? (
                        <Icon
                            name="Send"
                            height={16}
                            width={16}
                            fill="currentColor"
                        />
                    ) : (
                        <Spinner />
                    )}
                </span>
            </button>
        </div>
    );
};

export default AddReview;
