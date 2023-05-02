import {
    type FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import classNames from 'classnames';
import router from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import {
    AnimatedDiv as Animated,
    Dropdown,
    Modal,
    RecipeLink,
    RecipeRating,
    Switch,
    UserInfo,
} from '@components';
import { RecipeContext } from '@contexts';
import { type UpdateInput, useUpdateRecipeMutation } from '@generated/graphql';
import { useAppSelector, useKeyPress } from '@hooks';
import { IconBookmark, IconShare, IconStar } from '@icons';
import { type RecipeProps } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import Edit from './Edit';
import Ingredients from './Ingredients';
import PrepTime from './PrepTime';
import Rating from './Rating';
import Reviews from './Reviews';
import Servings from './Servings';
import Steps from './Steps';
import RecipeTitle from './Title';

const Recipe: FC<RecipeProps> = props => {
    const recipeRef = useRef(null);
    const [actionIndex, setActionIndex] = useState(0);
    const [active, setActive] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const loggedUser = useAppSelector(state => state.auth.user);
    const isEnterPressed = useKeyPress('Enter');

    const {
        title,
        image,
        prep,
        description,
        user,
        id,
        ingredients,
        withEdit,
        step,
        steps,
        hideMobile,
    } = props;

    const { name, photo } = user || {};
    const isTheSameUser = user?.id === loggedUser?.id;

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

    const settings = useMemo(
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
                return <RecipeLink />;
            case 1:
                return <RecipeRating />;
            default:
                return <></>;
        }
    }, [actionIndex, id]);

    const handleSelect = (index: number) => {
        setActionIndex(index);
        setOpenModal(true);
    };

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

    useEffect(() => {
        if (step === 2) setActive(1);
        if (step !== 2) setActive(0);
    }, [step]);

    useEffect(() => {
        if (isEnterPressed && isDirty) {
            handleSubmit(onSubmit);
        }
    }, [isEnterPressed, isDirty]);

    if (!user) return null;

    return (
        <RecipeContext.Provider
            value={{
                ...props,
                isEnterPressed,
                active,
                recipeRef,
                openModal,
                setOpenModal,
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
                    {prep && (
                        <Animated className="col-span-3 flex items-center gap-4 transition">
                            <PrepTime />
                            <Rating />
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
                    {(ingredients || steps) && (
                        <>
                            <Animated className="col-span-3 flex h-fit justify-center">
                                <Switch
                                    setActive={setActive}
                                    active={active}
                                    array={['Ingredients', 'Steps', 'Reviews']}
                                    size="sm"
                                    fullWidth
                                />
                            </Animated>
                            <div className="col-span-3 flex flex-col gap-4">
                                <Servings />
                                <Ingredients />
                                <Steps />
                                <Reviews />
                            </div>
                        </>
                    )}
                    <Dropdown
                        className="absolute top-5 right-5"
                        options={settings}
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
