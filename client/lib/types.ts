import { Dispatch, SetStateAction } from 'react';

export type IUser = {
    _id: string;
    id: string;
    email: string;
    name: string;
    role: string;
    photo: string;
    terms?: boolean;
    updatedAt: string;
    createdAt: string;
};

export type IIngredient = {
    name: string;
    amount: string;
};

export type IHeader = {
    header: string;
};

export type NavState = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export type IStep = {
    step: string;
};

export type IRecipe = {
    id: string;
    title: string;
    description: string;
    prep: string;
    cuisine: string;
    servings?: number | null | undefined;
    image: string;
    temp?: boolean;
    step?: number;
    steps: string[];
    ingredients: IIngredient[];
    user?: {
        name: string;
        photo: string;
    };
};

export type IReview = {
    id: string;
    createdAt: Date;
    text: string;
    pos: string[];
    neg: string[];
    user: {
        name: string;
        photo: string;
    };
};

export type IReviewMini = {
    className?: string;
    review: IReview;
};
