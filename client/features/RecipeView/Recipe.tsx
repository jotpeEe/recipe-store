import React, { type FC, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import {
    AnimatedDiv as Animated,
    Button,
    Dropdown,
    Modal,
    ModalMessage,
    RecipeCard,
    RecipeLink,
    RecipeRating,
    Switch,
    UserInfo,
} from '@components';
import { RecipeContext } from '@contexts';
import { useDeleteRecipeMutation } from '@generated/graphql';
import { useAppSelector } from '@hooks';
import Icon from '@icons';
import { type RecipeProps } from '@lib/types';
import { requestClient } from '@requests';

import Description from './Description';
import Ingredients from './Ingredients';
import Reviews from './Reviews';
import Servings from './Servings';
import Steps from './Steps';

const Recipe: FC<RecipeProps> = props => {
    const recipeRef = useRef(null);
    const [actionIndex, setActionIndex] = useState(0);
    const [activeSwitchOption, setActiveSwitchOption] = useState('Ingredients');
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
        isClickedOutside,
        ratings,
        image,
        step,
        steps,
        hideMobile,
    } = props;

    const { name, photo } = user || {};
    const isTheSameUser = user?.id === loggedUser?.id;

    const settings = useMemo(() => {
        const baseSettings = [
            {
                icon: <Icon name="Share" width={16} height={16} />,
                text: 'Share',
            },
            {
                icon: <Icon name="Star" width={16} height={16} />,
                text: 'Rate Recipe',
            },
            {
                icon: <Icon name="RemoveBookmark" width={16} height={16} />,
                text: 'Unsave',
            },
        ];

        if (isTheSameUser) {
            baseSettings.push({
                icon: <Icon name="Delete" width={16} height={16} />,
                text: 'Delete',
            });
        }

        return baseSettings;
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

    // Handlers
    const handleCategoryFilterChange = (filter: string) => {
        setActiveSwitchOption(filter);
    };

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

    // Render elements based on actionIndex
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
        setActiveSwitchOption(step === 2 ? 'Steps' : 'Ingredients');
    }, [step]);

    if (!user) return null;

    return (
        <RecipeContext.Provider
            value={{
                ...props,
                active: activeSwitchOption,
                openModal,
                setOpenModal,
                isClickedOutside,
                isTheSameUser,
                withEdit,
                onSubmit,
            }}
        >
            <div
                ref={recipeRef}
                className={classNames(
                    'relative grid h-fit w-[380px] origin-top grid-cols-3 gap-y-8 rounded-xl p-8 shadow-card transition-transform duration-500',
                    hideMobile ? 'hidden md:grid' : 'grid'
                )}
            >
                {(title || prep || cuisine || description) && (
                    <RecipeCard
                        recipe={{ id, title, prep, user, ratings, image }}
                        variant={withEdit ? 'recipe' : 'preview'}
                        handleRating={handleRating}
                    />
                )}
                <Description className="col-span-3" />
                {user && (
                    <Animated className="col-span-3 flex h-fit justify-between">
                        <UserInfo size="sm" title={name} imgSrc={photo} />
                        <Button size="sm" disabled={isTheSameUser}>
                            Follow
                        </Button>
                    </Animated>
                )}
                {(ingredients?.length !== 0 || steps?.length !== 0) && (
                    <>
                        <Animated className="col-span-3 flex h-fit justify-center">
                            <Switch
                                activeOption={activeSwitchOption}
                                onOptionChange={handleCategoryFilterChange}
                                options={['Ingredients', 'Steps', 'Reviews']}
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
                        className="absolute top-5 right-5 z-30"
                        options={settings}
                        onSelect={handleSelect}
                        vertical
                    />
                )}
                {openModal && (
                    <Modal
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        target={recipeRef.current || undefined}
                    >
                        {element}
                    </Modal>
                )}
            </div>
        </RecipeContext.Provider>
    );
};

export default Recipe;
