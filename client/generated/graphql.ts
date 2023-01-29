/* eslint-disable no-use-before-define */
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
    useMutation,
    useQuery,
    UseMutationOptions,
    UseQueryOptions,
} from 'react-query';

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

export type Ingredient = {
    __typename?: 'Ingredient';
    amount: Scalars['String'];
    name: Scalars['String'];
};

export type IngredientInput = {
    amount: Scalars['String'];
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
    steps?: InputMaybe<Array<Scalars['String']>>;
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
    createRecipe: Response;
    createReview: ReviewResponse;
    deleteRecipe: PopulatedResponse;
    deleteReview: ReviewPopulatedResponse;
    deleteUser: Scalars['Boolean'];
    loginUser: LoginResponse;
    signupUser: UserResponse;
    updateRecipe: Response;
    updateReview: ReviewResponse;
};

export type MutationCreateRecipeArgs = {
    input: Input;
};

export type MutationCreateReviewArgs = {
    id: Scalars['String'];
    input: Scalars['String'];
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
    id?: Maybe<Scalars['String']>;
    image: Scalars['String'];
    ingredients: Array<Ingredient>;
    prep: Scalars['String'];
    reviews: Array<ReviewData>;
    servings?: Maybe<Scalars['Float']>;
    step: Scalars['Float'];
    steps: Array<Scalars['String']>;
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
    getAllRecipes: ListResponse;
    getLastReviews: ReviewListResponse;
    getMe: UserResponse;
    getRecipe: PopulatedResponse;
    getRecipes: ListResponse;
    getReviewsByAuthor: ReviewListResponse;
    getReviewsByRecipe: ReviewListResponse;
    getTempRecipe?: Maybe<PopulatedResponse>;
    logoutUser: Scalars['Boolean'];
    refreshAccessToken: LoginResponse;
};

export type QueryGetRecipeArgs = {
    id: Scalars['String'];
};

export type QueryGetReviewsByAuthorArgs = {
    author: Scalars['String'];
};

export type QueryGetReviewsByRecipeArgs = {
    id: Scalars['String'];
};

export type RecipeData = {
    __typename?: 'RecipeData';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    cuisine: Scalars['String'];
    description: Scalars['String'];
    id?: Maybe<Scalars['String']>;
    image: Scalars['String'];
    ingredients: Array<Ingredient>;
    prep: Scalars['String'];
    servings?: Maybe<Scalars['Float']>;
    step: Scalars['Float'];
    steps: Array<Scalars['String']>;
    temp: Scalars['Boolean'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: Scalars['String'];
};

export type Response = {
    __typename?: 'Response';
    recipe: RecipeData;
    status: Scalars['String'];
};

export type ReviewData = {
    __typename?: 'ReviewData';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    id?: Maybe<Scalars['String']>;
    neg: Array<Scalars['String']>;
    pos: Array<Scalars['String']>;
    recipe: Scalars['String'];
    recipeAuthor: Scalars['String'];
    text: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: Scalars['String'];
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
    recipe: RecipeData;
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
    review: ReviewData;
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

export type UpdateInput = {
    cuisine?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    image?: InputMaybe<Scalars['String']>;
    ingredients?: InputMaybe<Array<IngredientInput>>;
    prep?: InputMaybe<Scalars['String']>;
    reviews?: InputMaybe<Array<Scalars['String']>>;
    servings?: InputMaybe<Scalars['Float']>;
    step?: InputMaybe<Scalars['Float']>;
    steps?: InputMaybe<Array<Scalars['String']>>;
    title?: InputMaybe<Scalars['String']>;
};

export type UserData = {
    __typename?: 'UserData';
    _id: Scalars['String'];
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

export type CreateRecipeMutationVariables = Exact<{
    input: Input;
}>;

export type CreateRecipeMutation = {
    __typename?: 'Mutation';
    createRecipe: {
        __typename?: 'Response';
        status: string;
        recipe: {
            __typename?: 'RecipeData';
            title: string;
            description: string;
            prep: string;
            cuisine: string;
            servings?: number | null;
            image: string;
            createdAt: any;
            updatedAt: any;
            user: string;
            temp: boolean;
            id: string;
        };
    };
};

export type DeleteRecipeMutationVariables = Exact<{
    id: Scalars['String'];
}>;

export type DeleteRecipeMutation = {
    __typename?: 'Mutation';
    deleteRecipe: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: { __typename?: 'PopulatedData'; id: string } | null;
    };
};

export type DeleteUserMutationVariables = Exact<{
    id: Scalars['String'];
}>;

export type DeleteUserMutation = {
    __typename?: 'Mutation';
    deleteUser: boolean;
};

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllRecipesQuery = {
    __typename?: 'Query';
    getAllRecipes: {
        __typename?: 'ListResponse';
        status: string;
        results: number;
        recipes: Array<{
            __typename?: 'PopulatedData';
            title: string;
            description: string;
            prep: string;
            cuisine: string;
            servings?: number | null;
            image: string;
            createdAt: any;
            updatedAt: any;
            id: string;
            user: {
                __typename?: 'UserData';
                _id: string;
                name: string;
                photo: string;
            };
        }>;
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
            _id: string;
            id: string;
            email: string;
            name: string;
            role: string;
            photo: string;
            updatedAt: any;
            createdAt: any;
        };
    };
};

export type GetMyRecipesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyRecipesQuery = {
    __typename?: 'Query';
    getRecipes: {
        __typename?: 'ListResponse';
        status: string;
        results: number;
        recipes: Array<{
            __typename?: 'PopulatedData';
            title: string;
            prep: string;
            image: string;
            cuisine: string;
            id: string;
        }>;
    };
};

export type GetRecipeByIdQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type GetRecipeByIdQuery = {
    __typename?: 'Query';
    getRecipe: {
        __typename?: 'PopulatedResponse';
        recipe?: {
            __typename?: 'PopulatedData';
            cuisine: string;
            title: string;
            description: string;
            prep: string;
            servings?: number | null;
            image: string;
            steps: Array<string>;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
            }>;
            user: { __typename?: 'UserData'; name: string; photo: string };
        } | null;
    };
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

export type GetTempRecipeQueryVariables = Exact<{ [key: string]: never }>;

export type GetTempRecipeQuery = {
    __typename?: 'Query';
    temp?: {
        __typename?: 'PopulatedResponse';
        status: string;
        recipe?: {
            __typename?: 'PopulatedData';
            title: string;
            description: string;
            prep: string;
            cuisine: string;
            servings?: number | null;
            image: string;
            steps: Array<string>;
            id: string;
            ingredients: Array<{
                __typename?: 'Ingredient';
                name: string;
                amount: string;
            }>;
        } | null;
    } | null;
};

export type UpdateRecipeMutationVariables = Exact<{
    id: Scalars['String'];
    input: UpdateInput;
}>;

export type UpdateRecipeMutation = {
    __typename?: 'Mutation';
    updateRecipe: {
        __typename?: 'Response';
        status: string;
        recipe: { __typename?: 'RecipeData'; id: string };
    };
};

export const CreateRecipeDocument = `
    mutation CreateRecipe($input: Input!) {
  createRecipe(input: $input) {
    status
    recipe {
      id: _id
      title
      description
      prep
      cuisine
      servings
      image
      createdAt
      updatedAt
      user
      temp
    }
  }
}
    `;
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
export const DeleteRecipeDocument = `
    mutation DeleteRecipe($id: String!) {
  deleteRecipe(id: $id) {
    status
    recipe {
      id: _id
    }
  }
}
    `;
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
export const GetAllRecipesDocument = `
    query GetAllRecipes {
  getAllRecipes {
    status
    results
    recipes {
      id: _id
      title
      description
      prep
      cuisine
      servings
      image
      createdAt
      updatedAt
      user {
        _id
        name
        photo
      }
    }
  }
}
    `;
export const useGetAllRecipesQuery = <
    TData = GetAllRecipesQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetAllRecipesQueryVariables,
    options?: UseQueryOptions<GetAllRecipesQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAllRecipesQuery, TError, TData>(
        variables === undefined
            ? ['GetAllRecipes']
            : ['GetAllRecipes', variables],
        fetcher<GetAllRecipesQuery, GetAllRecipesQueryVariables>(
            client,
            GetAllRecipesDocument,
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
      _id
      id
      email
      name
      role
      photo
      updatedAt
      createdAt
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
export const GetMyRecipesDocument = `
    query GetMyRecipes {
  getRecipes {
    status
    results
    recipes {
      id: _id
      title
      prep
      image
      cuisine
    }
  }
}
    `;
export const useGetMyRecipesQuery = <
    TData = GetMyRecipesQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetMyRecipesQueryVariables,
    options?: UseQueryOptions<GetMyRecipesQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetMyRecipesQuery, TError, TData>(
        variables === undefined
            ? ['GetMyRecipes']
            : ['GetMyRecipes', variables],
        fetcher<GetMyRecipesQuery, GetMyRecipesQueryVariables>(
            client,
            GetMyRecipesDocument,
            variables,
            headers
        ),
        options
    );
export const GetRecipeByIdDocument = `
    query GetRecipeById($id: String!) {
  getRecipe(id: $id) {
    recipe {
      id: _id
      cuisine
      title
      description
      prep
      servings
      ingredients {
        name
        amount
      }
      image
      steps
      user {
        name
        photo
      }
    }
  }
}
    `;
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
export const GetTempRecipeDocument = `
    query GetTempRecipe {
  temp: getTempRecipe {
    status
    recipe {
      id: _id
      title
      description
      prep
      cuisine
      servings
      image
      steps
      ingredients {
        name
        amount
      }
    }
  }
}
    `;
export const useGetTempRecipeQuery = <
    TData = GetTempRecipeQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetTempRecipeQueryVariables,
    options?: UseQueryOptions<GetTempRecipeQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetTempRecipeQuery, TError, TData>(
        variables === undefined
            ? ['GetTempRecipe']
            : ['GetTempRecipe', variables],
        fetcher<GetTempRecipeQuery, GetTempRecipeQueryVariables>(
            client,
            GetTempRecipeDocument,
            variables,
            headers
        ),
        options
    );
export const UpdateRecipeDocument = `
    mutation UpdateRecipe($id: String!, $input: UpdateInput!) {
  updateRecipe(id: $id, input: $input) {
    status
    recipe {
      id: _id
    }
  }
}
    `;
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
