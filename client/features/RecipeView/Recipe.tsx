import { type FC, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import {
    AnimatedDiv as Animated,
    Dropdown,
    Modal,
    ModalMessage,
    RecipeLink,
    RecipeRating,
    Switch,
    UserInfo,
} from '@components';
import { RecipeContext } from '@contexts';
import { useDeleteRecipeMutation } from '@generated/graphql';
import { useAppSelector } from '@hooks';
import { IconDelete, IconRemoveBookmark, IconShare, IconStar } from '@icons';
import { type RecipeProps } from '@lib/types';
import { requestClient } from '@requests';

import Description from './Description';
import Ingredients from './Ingredients';
import Reviews from './Reviews';
import Servings from './Servings';
import Steps from './Steps';
import Title from './Title';

const Recipe: FC<RecipeProps> = props => {
    const recipeRef = useRef(null);
    const [actionIndex, setActionIndex] = useState(0);
    const [active, setActive] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const loggedUser = useAppSelector(state => state.auth.user);

    const {
        title,
        prep,
        user,
        id,
        description,
        cuisine,
        ingredients,
        withEdit,
        onSubmit,
        step,
        steps,
        hideMobile,
    } = props;

    const { name, photo } = user || {};
    const isTheSameUser = user?.id === loggedUser?.id;

    const settings = useMemo(() => {
        const array = [
            { icon: <IconShare width={16} height={16} />, text: 'Share' },
            {
                icon: <IconStar width={16} height={16} />,
                text: 'Rate Recipe',
            },
            {
                icon: <IconRemoveBookmark width={16} height={16} />,
                text: 'Unsave',
            },
        ];
        if (isTheSameUser) {
            array.push({
                icon: <IconDelete width={16} height={16} />,
                text: 'Delete',
            });
        }
        return array;
    }, [isTheSameUser]);

    const router = useRouter();

    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient, {
        onError() {
            router.push('/auth');
        },
        onSuccess() {
            router.push('/#recipes');
        },
    });

    const handleDelete = () => {
        if (id) deleteRecipe({ id });
    };

    const handleSelect = (index: number) => {
        setActionIndex(index);
        setOpenModal(true);
    };

    const handleRating = () => {
        if (withEdit) {
            setActionIndex(1);
            setOpenModal(true);
        }
    };

    const onCancel = () => {
        setOpenModal(false);
    };

    const element = useMemo(() => {
        switch (actionIndex) {
            case 0:
                return <RecipeLink />;
            case 1:
                return <RecipeRating />;
            case 3:
                return (
                    <ModalMessage
                        message="Are you sure, you want to delete recipe?"
                        onCancel={onCancel}
                        onConfirm={handleDelete}
                    />
                );
            default:
                return <></>;
        }
    }, [actionIndex, id]);

    useEffect(() => {
        if (step === 2) setActive(1);
        if (step !== 2) setActive(0);
    }, [step]);

    if (!user) return null;

    return (
        <RecipeContext.Provider
            value={{
                ...props,
                active,
                recipeRef,
                openModal,
                setOpenModal,
                isTheSameUser,
                withEdit,
                onSubmit,
            }}
        >
            <div
                ref={recipeRef}
                className={classNames(
                    'relative grid h-fit max-w-sm origin-top grid-cols-3 gap-y-8 rounded-xl p-8 shadow-card transition-transform duration-500',
                    hideMobile ? 'hidden md:grid' : 'grid'
                )}
            >
                {(title || prep || cuisine || description) && (
                    <Title handleRating={handleRating} />
                )}
                <Description className="col-span-3" />
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
                {withEdit && (
                    <Dropdown
                        className="absolute top-5 right-5"
                        options={settings}
                        onSelect={handleSelect}
                    />
                )}
                <Modal
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                    target={recipeRef.current || undefined}
                >
                    {element}
                </Modal>
            </div>
        </RecipeContext.Provider>
    );
};

export default Recipe;
