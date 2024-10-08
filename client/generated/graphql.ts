/* eslint-disable no-use-before-define */
import {
    type UseMutationOptions,
    type UseQueryOptions,
    useMutation,
    useQuery,
} from '@tanstack/react-query';
import { type GraphQLClient } from 'graphql-request';
import { type RequestInit } from 'graphql-request/dist/types.dom';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables extends { [key: string]: any }>(
    client: GraphQLClient,
    query: string,
    variables?: TVariables,
    requestHeaders?: RequestInit['headers']
) {
    return async (): Promise<TData> =>
        client.request({
            document: query,
            variables,
            requestHeaders,
        });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type AvailableCatResponse = {
    __typename?: 'AvailableCatResponse';
    category: Array<Scalars['String']>;
    results: Scalars['Float'];
    status: Scalars['String'];
};

export type Ingredient = {
    __typename?: 'Ingredient';
    amount: Scalars['String'];
    edit?: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
};

export type IngredientInput = {
    amount: Scalars['String'];
    edit?: InputMaybe<Scalars['Boolean']>;
    name: Scalars['String'];
};

export type Input = {
    cuisine: Scalars['String'];
    description: Scalars['String'];
    image?: InputMaybe<Scalars['String']>;
    ingredients?: InputMaybe<Array<IngredientInput>>;
    prep: Scalars['String'];
    servings?: InputMaybe<Scalars['Float']>;
    step?: InputMaybe<Scalars['Float']>;
    steps?: InputMaybe<Array<StepInput>>;
    temp?: InputMaybe<Scalars['Boolean']>;
    title: Scalars['String'];
};

export type ListResponse = {
    __typename?: 'ListResponse';
    recipes: Array<PopulatedData>;
    results: Scalars['Float'];
    status: Scalars['String'];
};

export type LoginInput = {
    email: Scalars['String'];
    password: Scalars['String'];
};

export type LoginResponse = {
    __typename?: 'LoginResponse';
    access_token: Scalars['String'];
    status: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    addBookmark: UserResponse;
    createRating: RatingResponse;
    createRecipe: PopulatedResponse;
    createReview: ReviewResponse;
    deleteRating: RatingDeleteResponse;
    deleteRecipe: PopulatedResponse;
    deleteReview: ReviewPopulatedResponse;
    deleteUser: Scalars['Boolean'];
    loginUser: LoginResponse;
    signupUser: UserResponse;
    updateRating: RatingResponse;
    updateRecipe: PopulatedResponse;
    updateReview: ReviewResponse;
};

export type MutationAddBookmarkArgs = {
    id: Scalars['String'];
};

export type MutationCreateRatingArgs = {
    id: Scalars['String'];
    input: Scalars['Float'];
};

export type MutationCreateRecipeArgs = {
    input: Input;
};

export type MutationCreateReviewArgs = {
    id: Scalars['String'];
    input: Scalars['String'];
};

export type MutationDeleteRatingArgs = {
    id: Scalars['String'];
};

export type MutationDeleteRecipeArgs = {
    id: Scalars['String'];
};

export type MutationDeleteReviewArgs = {
    id: Scalars['String'];
    recipeId: Scalars['String'];
};

export type MutationDeleteUserArgs = {
    id: Scalars['String'];
};

export type MutationLoginUserArgs = {
    input: LoginInput;
};

export type MutationSignupUserArgs = {
    input: SignUpInput;
};

export type MutationUpdateRatingArgs = {
    id: Scalars['String'];
    input: Scalars['Float'];
};

export type MutationUpdateRecipeArgs = {
    id: Scalars['String'];
    input: UpdateInput;
};

export type MutationUpdateReviewArgs = {
    id: Scalars['String'];
    input: Scalars['String'];
};

export type PopulatedData = {
    __typename?: 'PopulatedData';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    cuisine: Scalars['String'];
    description: Scalars['String'];
    id: Scalars['String'];
    image: Scalars['String'];
    ingredients: Array<Ingredient>;
    prep: Scalars['String'];
    ratings: Array<RatingData>;
    reviews: Array<ReviewPopulatedData>;
    servings?: Maybe<Scalars['Float']>;
    step?: Maybe<Scalars['Float']>;
    steps: Array<Step>;
    temp: Scalars['Boolean'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: UserData;
};

export type PopulatedResponse = {
    __typename?: 'PopulatedResponse';
    recipe?: Maybe<PopulatedData>;
    status: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    getAllBookmarkedRecipes: ListResponse;
    getAllRecipes: ListResponse;
    getAvailableCategories: AvailableCatResponse;
    getLastReviews: ReviewListResponse;
    getMe: UserResponse;
    getMyReviews: ReviewListResponse;
    getRecipeById: PopulatedResponse;
    getRecipes: ListResponse;
    getReviewsBy: ReviewListResponse;
    getTempRecipe: PopulatedResponse;
    logoutUser: Scalars['Boolean'];
    refreshAccessToken: LoginResponse;
};

export type QueryGetAllRecipesArgs = {
    limit?: InputMaybe<Scalars['Float']>;
};

export type QueryGetAvailableCategoriesArgs = {
    cat: Scalars['String'];
};

export type QueryGetLastReviewsArgs = {
    limit?: InputMaybe<Scalars['Float']>;
};

export type QueryGetRecipeByIdArgs = {
    id: Scalars['String'];
};

export type QueryGetReviewsByArgs = {
    author?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['String']>;
};

export type RatingData = {
    __typename?: 'RatingData';
    _id: Scalars['String'];
    id: Scalars['String'];
    rating: Scalars['Float'];
    recipe: Scalars['String'];
    user: Scalars['String'];
};

export type RatingDeleteResponse = {
    __typename?: 'RatingDeleteResponse';
    status: Scalars['String'];
};

export type RatingResponse = {
    __typename?: 'RatingResponse';
    rating: RatingData;
    status: Scalars['String'];
};

export type ReviewListResponse = {
    __typename?: 'ReviewListResponse';
    results: Scalars['Float'];
    reviews: Array<ReviewPopulatedData>;
    status: Scalars['String'];
};

export type ReviewPopulatedData = {
    __typename?: 'ReviewPopulatedData';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    id?: Maybe<Scalars['String']>;
    neg: Array<Scalars['String']>;
    pos: Array<Scalars['String']>;
    recipe: Scalars['String'];
    recipeAuthor: UserData;
    text: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: UserData;
};

export type ReviewPopulatedResponse = {
    __typename?: 'ReviewPopulatedResponse';
    status: Scalars['String'];
};

export type ReviewResponse = {
    __typename?: 'ReviewResponse';
    review: ReviewPopulatedData;
    status: Scalars['String'];
};

export type SignUpInput = {
    email: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
    passwordConfirm: Scalars['String'];
    photo?: InputMaybe<Scalars['String']>;
    terms: Scalars['Boolean'];
};

export type Step = {
    __typename?: 'Step';
    edit?: Maybe<Scalars['Boolean']>;
    label?: Maybe<Scalars['String']>;
    text: Scalars['String'];
};

export type StepInput = {
    edit?: InputMaybe<Scalars['Boolean']>;
    label?: InputMaybe<Scalars['String']>;
    text: Scalars['String'];
};

export type UpdateInput = {
    cuisine?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    image?: InputMaybe<Scalars['String']>;
    ingredients?: InputMaybe<Array<IngredientInput>>;
    prep?: InputMaybe<Scalars['String']>;
    servings?: InputMaybe<Scalars['Float']>;
    step?: InputMaybe<Scalars['Float']>;
    steps?: InputMaybe<Array<StepInput>>;
    temp?: InputMaybe<Scalars['Boolean']>;
    title?: InputMaybe<Scalars['String']>;
};

export type UserData = {
    __typename?: 'UserData';
    _id: Scalars['String'];
    bookmarks?: Maybe<Array<Scalars['String']>>;
    createdAt: Scalars['DateTime'];
    email: Scalars['String'];
    id: Scalars['String'];
    name: Scalars['String'];
    photo: Scalars['String'];
    role: Scalars['String'];
    terms: Scalars['Boolean'];
    updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
    __typename?: 'UserResponse';
    status: Scalars['String'];
    user: UserData;
};

export type BaseRecipeFragmentFragment = {
    __typename?: 'PopulatedData';
    title: string;
    prep: string;
    image: string;
    cuisine: string;
    createdAt: any;
    id: string;
    user: { __typename?: 'UserData'; name: string; photo: string; id: string };
    ratings: Array<{
        __typename?: 'RatingData';
        recipe: string;
        rating: number;
        user: string;
        id: string;
    }>;
    ingredients: Array<{
        __typename?: 'Ingredient';
        name: string;
        amount: string;
        edit?: boolean | null;
    }>;
};

export type BaseRecipeInputFragmentFragment = {
    __typename?: 'PopulatedData';
    cuisine: string;
    title: string;
    description: string;
    prep: string;
    servings?: number | null;
    image: string;
    id: string;
    ingredients: Array<{
        __typename?: 'Ingredient';
        name: string;
        amount: string;
        edit?: boolean | null;
    }>;
    steps: Array<{
        __typename?: 'Step';
        label?: string | null;
        text: string;
        edit?: boolean | null;
    }>;
};

export type WideRecipeFragmentFragment = {
    __typename?: 'PopulatedData';
    cuisine: string;
    title: string;
    description: string;
    prep: string;
    servings?: number | null;
    createdAt: any;
    image: string;
    id: string;
    ingredients: Array<{
        __typename?: 'Ingredient';
        name: string;
        amount: string;
        edit?: boolean | null;
    }>;
    steps: Array<{
        __typename?: 'Step';
        label?: string | null;
        text: string;
        edit?: boolean | null;
    }>;
    user: { __typename?: 'UserData'; name: string; photo: string; id: string };
    reviews: Array<{
        __typename?: 'ReviewPopulatedData';
        text: string;
        pos: Array<string>;
        neg: Array<string>;
        createdAt: any;
        recipe: string;
        id: string;
        recipeAuthor: {
            __typename?: 'UserData';
            name: string;
            photo: string;
            id: string;
        };
        user: {
            __typename?: 'UserData';
            name: string;
            photo: string;
            id: string;
        };
    }>;
    ratings: Array<{
        __typename?: 'RatingData';
        recipe: string;
        rating: number;
        user: string;
        id: string;
    }>;
};

export type ReviewFragmentFragment = {
    __typename?: 'ReviewPopulatedData';
    text: string;
    pos: Array<string>;
    neg: Array<string>;
    createdAt: any;
    recipe: string;
    id: string;
    recipeAuthor: {
        __typename?: 'UserData';
        name: string;
        photo: string;
        id: string;
    };
    user: { __typename?: 'UserData'; name: string; photo: string; id: string };
};

export type AddBookmarkMutationVariables = Exact<{
    id: Scalars['String'];
}>;

export type AddBookmarkMutation = {
    __typename?: 'Mutation';
    addBookmark: {
        __typename?: 'UserResponse';
        status: string;
        user: {
            __typename?: 'UserData';
            name: string;
            photo: string;
            bookmarks?: Array<string> | null;
            id: string;
        };
    };
};

export type CreateRatingMutationVariables = Exact<{
    input: Scalars['Float'];
    id: Scalars['String'];
}>;

export type CreateRatingMutation = {
    __typename?: 'Mutation';
    createRating: {
        __typename?: 'RatingResponse';
        status: string;
        rating: {
            __typename?: 'RatingData';
            id: string;
            rating: number;
            recipe: string;
            user: string;
        };
    };
};

export type CreateRecipeMutationVariables = Exact<{
    input: Input;
}>;

export type CreateRecipeMutation = {
    __typename?: 'Mutation';
    createRecipe: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: {
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
        } | null;
    };
};

export type CreateReviewMutationVariables = Exact<{
    input: Scalars['String'];
    id: Scalars['String'];
}>;

export type CreateReviewMutation = {
    __typename?: 'Mutation';
    createReview: { __typename?: 'ReviewResponse'; status: string };
};

export type DeleteRecipeMutationVariables = Exact<{
    id: Scalars['String'];
}>;

export type DeleteRecipeMutation = {
    __typename?: 'Mutation';
    deleteRecipe: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: {
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
        } | null;
    };
};

export type DeleteUserMutationVariables = Exact<{
    id: Scalars['String'];
}>;

export type DeleteUserMutation = {
    __typename?: 'Mutation';
    deleteUser: boolean;
};

export type LoginUserMutationVariables = Exact<{
    input: LoginInput;
}>;

export type LoginUserMutation = {
    __typename?: 'Mutation';
    loginUser: {
        __typename?: 'LoginResponse';
        status: string;
        access_token: string;
    };
};

export type SignUpUserMutationVariables = Exact<{
    input: SignUpInput;
}>;

export type SignUpUserMutation = {
    __typename?: 'Mutation';
    signupUser: {
        __typename?: 'UserResponse';
        status: string;
        user: { __typename?: 'UserData'; name: string; email: string };
    };
};

export type UpdateRatingMutationVariables = Exact<{
    id: Scalars['String'];
    input: Scalars['Float'];
}>;

export type UpdateRatingMutation = {
    __typename?: 'Mutation';
    updateRating: {
        __typename?: 'RatingResponse';
        status: string;
        rating: {
            __typename?: 'RatingData';
            id: string;
            rating: number;
            recipe: string;
            user: string;
        };
    };
};

export type UpdateRecipeMutationVariables = Exact<{
    id: Scalars['String'];
    input: UpdateInput;
}>;

export type UpdateRecipeMutation = {
    __typename?: 'Mutation';
    updateRecipe: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: {
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            createdAt: any;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            reviews: Array<{
                __typename?: 'ReviewPopulatedData';
                text: string;
                pos: Array<string>;
                neg: Array<string>;
                createdAt: any;
                recipe: string;
                id: string;
                recipeAuthor: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
                user: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
            }>;
            ratings: Array<{
                __typename?: 'RatingData';
                recipe: string;
                rating: number;
                user: string;
                id: string;
            }>;
        } | null;
    };
};

export type GetAllRecipesAndLastReviewsQueryVariables = Exact<{
    limit?: InputMaybe<Scalars['Float']>;
}>;

export type GetAllRecipesAndLastReviewsQuery = {
    __typename?: 'Query';
    getAllRecipes: {
        __typename?: 'ListResponse';
        status: string;
        results: number;
        recipes: Array<{
            __typename?: 'PopulatedData';
            title: string;
            prep: string;
            image: string;
            cuisine: string;
            createdAt: any;
            id: string;
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            ratings: Array<{
                __typename?: 'RatingData';
                recipe: string;
                rating: number;
                user: string;
                id: string;
            }>;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
        }>;
    };
    getLastReviews: {
        __typename?: 'ReviewListResponse';
        status: string;
        results: number;
        reviews: Array<{
            __typename?: 'ReviewPopulatedData';
            text: string;
            pos: Array<string>;
            neg: Array<string>;
            createdAt: any;
            recipe: string;
            id: string;
            recipeAuthor: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
        }>;
    };
};

export type GetAvailableCategoriesQueryVariables = Exact<{
    cat: Scalars['String'];
}>;

export type GetAvailableCategoriesQuery = {
    __typename?: 'Query';
    getAvailableCategories: {
        __typename?: 'AvailableCatResponse';
        status: string;
        results: number;
        category: Array<string>;
    };
};

export type GetCreateRecipeDataQueryVariables = Exact<{
    cat: Scalars['String'];
}>;

export type GetCreateRecipeDataQuery = {
    __typename?: 'Query';
    getAvailableCategories: {
        __typename?: 'AvailableCatResponse';
        status: string;
        results: number;
        category: Array<string>;
    };
    getTempRecipe: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: {
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
        } | null;
    };
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
    __typename?: 'Query';
    getMe: {
        __typename?: 'UserResponse';
        status: string;
        user: {
            __typename?: 'UserData';
            email: string;
            name: string;
            photo: string;
            _id: string;
            createdAt: any;
            role: string;
            terms: boolean;
            updatedAt: any;
            id: string;
        };
    };
};

export type GetProfileDataQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileDataQueryQuery = {
    __typename?: 'Query';
    getMyReviews: {
        __typename?: 'ReviewListResponse';
        status: string;
        results: number;
        reviews: Array<{
            __typename?: 'ReviewPopulatedData';
            text: string;
            pos: Array<string>;
            neg: Array<string>;
            createdAt: any;
            recipe: string;
            id: string;
            recipeAuthor: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
        }>;
    };
    getMe: {
        __typename?: 'UserResponse';
        status: string;
        user: {
            __typename?: 'UserData';
            name: string;
            photo: string;
            id: string;
        };
    };
    getRecipes: {
        __typename?: 'ListResponse';
        status: string;
        results: number;
        recipes: Array<{
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            createdAt: any;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            reviews: Array<{
                __typename?: 'ReviewPopulatedData';
                text: string;
                pos: Array<string>;
                neg: Array<string>;
                createdAt: any;
                recipe: string;
                id: string;
                recipeAuthor: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
                user: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
            }>;
            ratings: Array<{
                __typename?: 'RatingData';
                recipe: string;
                rating: number;
                user: string;
                id: string;
            }>;
        }>;
    };
    getAllBookmarkedRecipes: {
        __typename?: 'ListResponse';
        status: string;
        results: number;
        recipes: Array<{
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            createdAt: any;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            reviews: Array<{
                __typename?: 'ReviewPopulatedData';
                text: string;
                pos: Array<string>;
                neg: Array<string>;
                createdAt: any;
                recipe: string;
                id: string;
                recipeAuthor: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
                user: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
            }>;
            ratings: Array<{
                __typename?: 'RatingData';
                recipe: string;
                rating: number;
                user: string;
                id: string;
            }>;
        }>;
    };
};

export type GetRecipeByIdQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type GetRecipeByIdQuery = {
    __typename?: 'Query';
    getRecipeById: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: {
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            createdAt: any;
            image: string;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
                edit?: boolean | null;
            }>;
            steps: Array<{
                __typename?: 'Step';
                label?: string | null;
                text: string;
                edit?: boolean | null;
            }>;
            user: {
                __typename?: 'UserData';
                name: string;
                photo: string;
                id: string;
            };
            reviews: Array<{
                __typename?: 'ReviewPopulatedData';
                text: string;
                pos: Array<string>;
                neg: Array<string>;
                createdAt: any;
                recipe: string;
                id: string;
                recipeAuthor: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
                user: {
                    __typename?: 'UserData';
                    name: string;
                    photo: string;
                    id: string;
                };
            }>;
            ratings: Array<{
                __typename?: 'RatingData';
                recipe: string;
                rating: number;
                user: string;
                id: string;
            }>;
        } | null;
    };
};

export type LogoutUserQueryVariables = Exact<{ [key: string]: never }>;

export type LogoutUserQuery = { __typename?: 'Query'; logoutUser: boolean };

export type RefreshAccessTokenQueryVariables = Exact<{ [key: string]: never }>;

export type RefreshAccessTokenQuery = {
    __typename?: 'Query';
    refreshAccessToken: {
        __typename?: 'LoginResponse';
        status: string;
        access_token: string;
    };
};

export const BaseRecipeFragmentFragmentDoc = `
    fragment BaseRecipeFragment on PopulatedData {
  id: _id
  title
  prep
  image
  cuisine
  image
  user {
    id: _id
    name
    photo
  }
  ratings {
    id: _id
    recipe
    rating
    user
  }
  ingredients {
    name
    amount
    edit
  }
  createdAt
}
    `;
export const BaseRecipeInputFragmentFragmentDoc = `
    fragment BaseRecipeInputFragment on PopulatedData {
  id: _id
  cuisine
  title
  description
  prep
  servings
  ingredients {
    name
    amount
    edit
  }
  image
  steps {
    label
    text
    edit
  }
}
    `;
export const WideRecipeFragmentFragmentDoc = `
    fragment WideRecipeFragment on PopulatedData {
  id: _id
  cuisine
  title
  description
  prep
  servings
  createdAt
  ingredients {
    name
    amount
    edit
  }
  image
  steps {
    label
    text
    edit
  }
  user {
    id: _id
    name
    photo
  }
  reviews {
    id: _id
    text
    pos
    neg
    createdAt
    recipeAuthor {
      id: _id
      name
      photo
    }
    recipe
    user {
      id: _id
      name
      photo
    }
  }
  ratings {
    id: _id
    recipe
    rating
    user
  }
}
    `;
export const ReviewFragmentFragmentDoc = `
    fragment ReviewFragment on ReviewPopulatedData {
  id: _id
  text
  pos
  neg
  createdAt
  recipeAuthor {
    id: _id
    name
    photo
  }
  recipe
  user {
    id: _id
    name
    photo
  }
}
    `;
export const AddBookmarkDocument = `
    mutation AddBookmark($id: String!) {
  addBookmark(id: $id) {
    status
    user {
      id: _id
      name
      photo
      bookmarks
    }
  }
}
    `;
export const useAddBookmarkMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        AddBookmarkMutation,
        TError,
        AddBookmarkMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        AddBookmarkMutation,
        TError,
        AddBookmarkMutationVariables,
        TContext
    >(
        ['AddBookmark'],
        (variables?: AddBookmarkMutationVariables) =>
            fetcher<AddBookmarkMutation, AddBookmarkMutationVariables>(
                client,
                AddBookmarkDocument,
                variables,
                headers
            )(),
        options
    );
export const CreateRatingDocument = `
    mutation CreateRating($input: Float!, $id: String!) {
  createRating(input: $input, id: $id) {
    status
    rating {
      id
      rating
      recipe
      user
    }
  }
}
    `;
export const useCreateRatingMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        CreateRatingMutation,
        TError,
        CreateRatingMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        CreateRatingMutation,
        TError,
        CreateRatingMutationVariables,
        TContext
    >(
        ['CreateRating'],
        (variables?: CreateRatingMutationVariables) =>
            fetcher<CreateRatingMutation, CreateRatingMutationVariables>(
                client,
                CreateRatingDocument,
                variables,
                headers
            )(),
        options
    );
export const CreateRecipeDocument = `
    mutation CreateRecipe($input: Input!) {
  createRecipe(input: $input) {
    status
    recipe {
      ...BaseRecipeInputFragment
    }
  }
}
    ${BaseRecipeInputFragmentFragmentDoc}`;
export const useCreateRecipeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        CreateRecipeMutation,
        TError,
        CreateRecipeMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        CreateRecipeMutation,
        TError,
        CreateRecipeMutationVariables,
        TContext
    >(
        ['CreateRecipe'],
        (variables?: CreateRecipeMutationVariables) =>
            fetcher<CreateRecipeMutation, CreateRecipeMutationVariables>(
                client,
                CreateRecipeDocument,
                variables,
                headers
            )(),
        options
    );
export const CreateReviewDocument = `
    mutation CreateReview($input: String!, $id: String!) {
  createReview(input: $input, id: $id) {
    status
  }
}
    `;
export const useCreateReviewMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        CreateReviewMutation,
        TError,
        CreateReviewMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        CreateReviewMutation,
        TError,
        CreateReviewMutationVariables,
        TContext
    >(
        ['CreateReview'],
        (variables?: CreateReviewMutationVariables) =>
            fetcher<CreateReviewMutation, CreateReviewMutationVariables>(
                client,
                CreateReviewDocument,
                variables,
                headers
            )(),
        options
    );
export const DeleteRecipeDocument = `
    mutation DeleteRecipe($id: String!) {
  deleteRecipe(id: $id) {
    status
    recipe {
      ...BaseRecipeInputFragment
    }
  }
}
    ${BaseRecipeInputFragmentFragmentDoc}`;
export const useDeleteRecipeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        DeleteRecipeMutation,
        TError,
        DeleteRecipeMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        DeleteRecipeMutation,
        TError,
        DeleteRecipeMutationVariables,
        TContext
    >(
        ['DeleteRecipe'],
        (variables?: DeleteRecipeMutationVariables) =>
            fetcher<DeleteRecipeMutation, DeleteRecipeMutationVariables>(
                client,
                DeleteRecipeDocument,
                variables,
                headers
            )(),
        options
    );
export const DeleteUserDocument = `
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id)
}
    `;
export const useDeleteUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        DeleteUserMutation,
        TError,
        DeleteUserMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        DeleteUserMutation,
        TError,
        DeleteUserMutationVariables,
        TContext
    >(
        ['DeleteUser'],
        (variables?: DeleteUserMutationVariables) =>
            fetcher<DeleteUserMutation, DeleteUserMutationVariables>(
                client,
                DeleteUserDocument,
                variables,
                headers
            )(),
        options
    );
export const LoginUserDocument = `
    mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    status
    access_token
  }
}
    `;
export const useLoginUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        LoginUserMutation,
        TError,
        LoginUserMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        LoginUserMutation,
        TError,
        LoginUserMutationVariables,
        TContext
    >(
        ['LoginUser'],
        (variables?: LoginUserMutationVariables) =>
            fetcher<LoginUserMutation, LoginUserMutationVariables>(
                client,
                LoginUserDocument,
                variables,
                headers
            )(),
        options
    );
export const SignUpUserDocument = `
    mutation SignUpUser($input: SignUpInput!) {
  signupUser(input: $input) {
    status
    user {
      name
      email
    }
  }
}
    `;
export const useSignUpUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        SignUpUserMutation,
        TError,
        SignUpUserMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        SignUpUserMutation,
        TError,
        SignUpUserMutationVariables,
        TContext
    >(
        ['SignUpUser'],
        (variables?: SignUpUserMutationVariables) =>
            fetcher<SignUpUserMutation, SignUpUserMutationVariables>(
                client,
                SignUpUserDocument,
                variables,
                headers
            )(),
        options
    );
export const UpdateRatingDocument = `
    mutation UpdateRating($id: String!, $input: Float!) {
  updateRating(id: $id, input: $input) {
    status
    rating {
      id
      rating
      recipe
      user
    }
  }
}
    `;
export const useUpdateRatingMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        UpdateRatingMutation,
        TError,
        UpdateRatingMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        UpdateRatingMutation,
        TError,
        UpdateRatingMutationVariables,
        TContext
    >(
        ['UpdateRating'],
        (variables?: UpdateRatingMutationVariables) =>
            fetcher<UpdateRatingMutation, UpdateRatingMutationVariables>(
                client,
                UpdateRatingDocument,
                variables,
                headers
            )(),
        options
    );
export const UpdateRecipeDocument = `
    mutation UpdateRecipe($id: String!, $input: UpdateInput!) {
  updateRecipe(id: $id, input: $input) {
    status
    recipe {
      ...WideRecipeFragment
    }
  }
}
    ${WideRecipeFragmentFragmentDoc}`;
export const useUpdateRecipeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        UpdateRecipeMutation,
        TError,
        UpdateRecipeMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        UpdateRecipeMutation,
        TError,
        UpdateRecipeMutationVariables,
        TContext
    >(
        ['UpdateRecipe'],
        (variables?: UpdateRecipeMutationVariables) =>
            fetcher<UpdateRecipeMutation, UpdateRecipeMutationVariables>(
                client,
                UpdateRecipeDocument,
                variables,
                headers
            )(),
        options
    );
export const GetAllRecipesAndLastReviewsDocument = `
    query GetAllRecipesAndLastReviews($limit: Float) {
  getAllRecipes(limit: $limit) {
    status
    results
    recipes {
      ...BaseRecipeFragment
    }
  }
  getLastReviews(limit: $limit) {
    status
    results
    reviews {
      ...ReviewFragment
    }
  }
}
    ${BaseRecipeFragmentFragmentDoc}
${ReviewFragmentFragmentDoc}`;
export const useGetAllRecipesAndLastReviewsQuery = <
    TData = GetAllRecipesAndLastReviewsQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetAllRecipesAndLastReviewsQueryVariables,
    options?: UseQueryOptions<GetAllRecipesAndLastReviewsQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAllRecipesAndLastReviewsQuery, TError, TData>(
        variables === undefined
            ? ['GetAllRecipesAndLastReviews']
            : ['GetAllRecipesAndLastReviews', variables],
        fetcher<
            GetAllRecipesAndLastReviewsQuery,
            GetAllRecipesAndLastReviewsQueryVariables
        >(client, GetAllRecipesAndLastReviewsDocument, variables, headers),
        options
    );
export const GetAvailableCategoriesDocument = `
    query getAvailableCategories($cat: String!) {
  getAvailableCategories(cat: $cat) {
    status
    results
    category
  }
}
    `;
export const useGetAvailableCategoriesQuery = <
    TData = GetAvailableCategoriesQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables: GetAvailableCategoriesQueryVariables,
    options?: UseQueryOptions<GetAvailableCategoriesQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAvailableCategoriesQuery, TError, TData>(
        ['getAvailableCategories', variables],
        fetcher<
            GetAvailableCategoriesQuery,
            GetAvailableCategoriesQueryVariables
        >(client, GetAvailableCategoriesDocument, variables, headers),
        options
    );
export const GetCreateRecipeDataDocument = `
    query GetCreateRecipeData($cat: String!) {
  getAvailableCategories(cat: $cat) {
    status
    results
    category
  }
  getTempRecipe {
    status
    recipe {
      ...BaseRecipeInputFragment
    }
  }
}
    ${BaseRecipeInputFragmentFragmentDoc}`;
export const useGetCreateRecipeDataQuery = <
    TData = GetCreateRecipeDataQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables: GetCreateRecipeDataQueryVariables,
    options?: UseQueryOptions<GetCreateRecipeDataQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetCreateRecipeDataQuery, TError, TData>(
        ['GetCreateRecipeData', variables],
        fetcher<GetCreateRecipeDataQuery, GetCreateRecipeDataQueryVariables>(
            client,
            GetCreateRecipeDataDocument,
            variables,
            headers
        ),
        options
    );
export const GetMeDocument = `
    query GetMe {
  getMe {
    status
    user {
      id: _id
      email
      name
      photo
      _id
      createdAt
      role
      terms
      updatedAt
    }
  }
}
    `;
export const useGetMeQuery = <TData = GetMeQuery, TError = unknown>(
    client: GraphQLClient,
    variables?: GetMeQueryVariables,
    options?: UseQueryOptions<GetMeQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetMeQuery, TError, TData>(
        variables === undefined ? ['GetMe'] : ['GetMe', variables],
        fetcher<GetMeQuery, GetMeQueryVariables>(
            client,
            GetMeDocument,
            variables,
            headers
        ),
        options
    );
export const GetProfileDataQueryDocument = `
    query GetProfileDataQuery {
  getMyReviews {
    status
    results
    reviews {
      ...ReviewFragment
    }
  }
  getMe {
    status
    user {
      id: _id
      name
      photo
    }
  }
  getRecipes {
    status
    results
    recipes {
      ...WideRecipeFragment
    }
  }
  getAllBookmarkedRecipes {
    status
    results
    recipes {
      ...WideRecipeFragment
    }
  }
}
    ${ReviewFragmentFragmentDoc}
${WideRecipeFragmentFragmentDoc}`;
export const useGetProfileDataQueryQuery = <
    TData = GetProfileDataQueryQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetProfileDataQueryQueryVariables,
    options?: UseQueryOptions<GetProfileDataQueryQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetProfileDataQueryQuery, TError, TData>(
        variables === undefined
            ? ['GetProfileDataQuery']
            : ['GetProfileDataQuery', variables],
        fetcher<GetProfileDataQueryQuery, GetProfileDataQueryQueryVariables>(
            client,
            GetProfileDataQueryDocument,
            variables,
            headers
        ),
        options
    );
export const GetRecipeByIdDocument = `
    query GetRecipeById($id: String!) {
  getRecipeById(id: $id) {
    status
    recipe {
      ...WideRecipeFragment
    }
  }
}
    ${WideRecipeFragmentFragmentDoc}`;
export const useGetRecipeByIdQuery = <
    TData = GetRecipeByIdQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables: GetRecipeByIdQueryVariables,
    options?: UseQueryOptions<GetRecipeByIdQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetRecipeByIdQuery, TError, TData>(
        ['GetRecipeById', variables],
        fetcher<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(
            client,
            GetRecipeByIdDocument,
            variables,
            headers
        ),
        options
    );
export const LogoutUserDocument = `
    query LogoutUser {
  logoutUser
}
    `;
export const useLogoutUserQuery = <TData = LogoutUserQuery, TError = unknown>(
    client: GraphQLClient,
    variables?: LogoutUserQueryVariables,
    options?: UseQueryOptions<LogoutUserQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<LogoutUserQuery, TError, TData>(
        variables === undefined ? ['LogoutUser'] : ['LogoutUser', variables],
        fetcher<LogoutUserQuery, LogoutUserQueryVariables>(
            client,
            LogoutUserDocument,
            variables,
            headers
        ),
        options
    );
export const RefreshAccessTokenDocument = `
    query RefreshAccessToken {
  refreshAccessToken {
    status
    access_token
  }
}
    `;
export const useRefreshAccessTokenQuery = <
    TData = RefreshAccessTokenQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: RefreshAccessTokenQueryVariables,
    options?: UseQueryOptions<RefreshAccessTokenQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<RefreshAccessTokenQuery, TError, TData>(
        variables === undefined
            ? ['RefreshAccessToken']
            : ['RefreshAccessToken', variables],
        fetcher<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(
            client,
            RefreshAccessTokenDocument,
            variables,
            headers
        ),
        options
    );
