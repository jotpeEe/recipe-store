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

export type Data = {
    __typename?: 'Data';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    cuisine: Scalars['String'];
    description: Scalars['String'];
    id?: Maybe<Scalars['String']>;
    image: Scalars['String'];
    prep: Scalars['Float'];
    servings: Scalars['Float'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: Scalars['String'];
};

export type Input = {
    cuisine: Scalars['String'];
    description: Scalars['String'];
    image: Scalars['String'];
    prep: Scalars['Float'];
    servings: Scalars['Float'];
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
    deleteRecipe: Scalars['Boolean'];
    deleteUser: Scalars['Boolean'];
    loginUser: LoginResponse;
    signupUser: UserResponse;
    updateRecipe: Response;
};

export type MutationCreateRecipeArgs = {
    input: Input;
};

export type MutationDeleteRecipeArgs = {
    id: Scalars['String'];
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

export type PopulatedData = {
    __typename?: 'PopulatedData';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    cuisine: Scalars['String'];
    description: Scalars['String'];
    id?: Maybe<Scalars['String']>;
    image: Scalars['String'];
    prep: Scalars['Float'];
    servings: Scalars['Float'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: UserData;
};

export type PopulatedResponse = {
    __typename?: 'PopulatedResponse';
    recipe: PopulatedData;
    status: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    getAllRecipes: ListResponse;
    getMe: UserResponse;
    getRecipe: PopulatedResponse;
    getRecipes: ListResponse;
    logoutUser: Scalars['Boolean'];
    refreshAccessToken: LoginResponse;
};

export type QueryGetRecipeArgs = {
    id: Scalars['String'];
};

export type Response = {
    __typename?: 'Response';
    recipe: Data;
    status: Scalars['String'];
};

export type SignUpInput = {
    email: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
    passwordConfirm: Scalars['String'];
    photo: Scalars['String'];
    terms: Scalars['Boolean'];
};

export type UpdateInput = {
    cuisine?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    image?: InputMaybe<Scalars['String']>;
    prep?: InputMaybe<Scalars['Float']>;
    servings?: InputMaybe<Scalars['Float']>;
    title?: InputMaybe<Scalars['String']>;
};

export type UserData = {
    __typename?: 'UserData';
    _id: Scalars['String'];
    createdAt: Scalars['DateTime'];
    email: Scalars['String'];
    id?: Maybe<Scalars['String']>;
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
            _id: string;
            title: string;
            description: string;
            prep: number;
            cuisine: string;
            servings: number;
            image: string;
            createdAt: any;
            updatedAt: any;
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
            id?: string | null;
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
            _id: string;
            title: string;
            prep: number;
            servings: number;
            image: string;
        }>;
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
      _id
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
      _id
      title
      prep
      servings
      image
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
