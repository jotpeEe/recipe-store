import {
    type FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import classNames from 'classnames';
import { hasCookie } from 'cookies-next';
import router from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { AnimatedDiv as Animated } from '@components/animations';
import RecipeLink from '@components/card/RecipeLink';
import RecipeRating from '@components/card/RecipeRating';
import Dropdown from '@components/Dropdown';
import Modal from '@components/Modal';
import { UserInfo } from '@components/user';
import { RecipeContext } from '@contexts';
import { type UpdateInput, useUpdateRecipeMutation } from '@generated/graphql';
import { useAppSelector, useKeyPress } from '@hooks';
import { IconBookmark, IconClock, IconShare, IconStar } from '@icons';
import { type IRecipe, type IReview } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import Display from './Display';
import Edit from './Edit';
import RecipeTitle from './Title';

export type RecipeProps = Partial<IRecipe> & {
    reviews?: IReview[];
    step?: number;
    withEdit?: boolean;
    hideMobile?: boolean;
};

const Recipe: FC<RecipeProps> = props => {
    const recipeRef = useRef(null);
    const [actionIndex, setActionIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const {
        title,
        image,
        prep,
        description,
        user,
        id,
        ingredients,
        withEdit,
        hideMobile,
    } = props;

    const { name, photo } = user || {};

    const methods = useForm<UpdateInput>({
        defaultValues: {
            title,
            prep,
            description,
            ingredients,
        },
    });
    const {
        handleSubmit,
        formState: { isDirty },
    } = methods;

    const options = useMemo(
        () => [
            { icon: <IconShare />, text: 'Share' },
            {
                icon: <IconStar width={16} height={16} />,
                text: 'Rate Recipe',
            },
            {
                icon: <IconBookmark width={16} height={16} />,
                text: 'Unsave',
            },
        ],
        []
    );

    const element = useMemo(() => {
        switch (actionIndex) {
            case 0:
                return <RecipeLink id={id} />;
            case 1:
                return <RecipeRating id={id} />;
            default:
                return <></>;
        }
    }, [actionIndex, id]);

    const handleSelect = (index: number) => {
        setActionIndex(index);
        setOpenModal(true);
    };

    const loggedUser = useAppSelector(state => state.auth.user);

    const isTheSameUser = user?.id === loggedUser?.id;

    const isEnterPressed = useKeyPress('Enter');

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries(['GetRecipeById']);
        },
        onError(error: any) {
            if (error.response.errors[0].message === 'No access token found') {
                router.push('/auth');
            }
        },
    });

    const onSubmit: SubmitHandler<UpdateInput> = useCallback(
        input => {
            if (id) {
                updateRecipe({ id, input });
            }
        },
        [id]
    );

    const numPrep = prep ? parseInt(prep, 10) : undefined;
    const loggedIn = hasCookie('logged_in');

    useEffect(() => {
        if (loggedIn) queryClient.refetchQueries(['GetMe']);
    }, []);

    useEffect(() => {
        if (isEnterPressed && isDirty) {
            handleSubmit(onSubmit)();
        }
    }, [isEnterPressed, isDirty]);

    if (!user) return null;

    return (
        <RecipeContext.Provider
            value={{
                ...props,
                isEnterPressed,
                isTheSameUser,
                withEdit,
                onSubmit,
            }}
        >
            <FormProvider {...methods}>
                <form
                    ref={recipeRef}
                    className={classNames(
                        'relative grid h-fit max-w-sm origin-top grid-cols-3 gap-y-8 rounded-xl p-8 shadow-card transition-transform duration-500',
                        hideMobile ? 'hidden md:grid' : 'grid'
                    )}
                >
                    {title && (
                        <RecipeTitle
                            className="col-span-3 h-fit"
                            imgSrc={image}
                            edit={isEnterPressed}
                            title={title}
                        />
                    )}
                    {numPrep && prep && (
                        <Animated className="col-span-3 flex items-center gap-4 transition">
                            <div className="flex items-center">
                                <Edit
                                    className="gap-1"
                                    name={['prep']}
                                    variant="number"
                                    value={prep}
                                >
                                    <IconClock />
                                    <span className="min-w-[4rem] text-xs ">
                                        {numPrep} min
                                    </span>
                                </Edit>
                            </div>
                            <div className="flex items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal">
                                <IconStar />
                                <span className="pl-1">4.5</span>
                            </div>
                        </Animated>
                    )}
                    {description && (
                        <Animated className="col-span-3">
                            <Edit
                                name={['description']}
                                variant="textarea"
                                value={description}
                            >
                                <p className="max-w-[36ch] break-words text-sm ">
                                    {description}
                                </p>
                            </Edit>
                        </Animated>
                    )}
                    {user && (
                        <Animated className="col-span-3 h-fit">
                            <UserInfo
                                size="sm"
                                title={name}
                                imgSrc={photo}
                                withFollow
                                withLocation
                                disabled={isTheSameUser}
                            />
                        </Animated>
                    )}
                    <Display />
                    <Dropdown
                        className="absolute top-5 right-5"
                        options={options}
                        onSelect={handleSelect}
                    />
                    <Modal
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        target={recipeRef.current || undefined}
                    >
                        {element}
                    </Modal>
                </form>
            </FormProvider>
        </RecipeContext.Provider>
    );
};

export default Recipe;
