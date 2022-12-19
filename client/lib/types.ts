export type IUser = {
    _id: string;
    id: string;
    email: string;
    name: string;
    role: string;
    photo: string;
    terms: boolean;
    updatedAt: string;
    createdAt: string;
};

export type IRecipe = {
    _id: string;
    title: string;
    description: string;
    prep: number;
    cuisine: string;
    servings: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        photo: string;
    };
};
