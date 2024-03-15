import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateFolderInput = {
  images?: InputMaybe<Array<ImageInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
};

export type CreateImageInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
};

export type CreateTemplateInput = {
  Images?: InputMaybe<Array<ImageInput>>;
  config?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
  variables?: InputMaybe<Array<VariableInput>>;
};

export type CreateUserInput = {
  billing_date?: InputMaybe<Scalars['String']['input']>;
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateVariableInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['Float']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  user: User;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
  user: User;
};

export type ImageInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
  user: UserInput;
};

export type InputLogin = {
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateUser: User;
  deleteFolder: Folder;
  deleteImage: Image;
  deleteTemplate: Template;
  deleteUser: User;
  deleteVariable: Variable;
  insertFolder: Folder;
  insertImage: Image;
  insertTemplate: Template;
  insertVariable: Variable;
  updateFolder: Folder;
  updateImage: Image;
  updateTemplate: Template;
  updateUser: User;
  updateVariable: Variable;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteFolderArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteTemplateArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVariableArgs = {
  id: Scalars['Float']['input'];
};


export type MutationInsertFolderArgs = {
  folder: CreateFolderInput;
};


export type MutationInsertImageArgs = {
  image: CreateImageInput;
};


export type MutationInsertTemplateArgs = {
  template: CreateTemplateInput;
};


export type MutationInsertVariableArgs = {
  variable: CreateVariableInput;
};


export type MutationUpdateFolderArgs = {
  folder: UpdateFolderInput;
};


export type MutationUpdateImageArgs = {
  user: UpdateImageInput;
};


export type MutationUpdateTemplateArgs = {
  user: UpdateTemplateInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationUpdateVariableArgs = {
  variable: UpdateVariableInput;
};

export type Query = {
  __typename?: 'Query';
  folderById: Array<Folder>;
  folders: Array<Folder>;
  imageById: Image;
  images: Array<Image>;
  login: Message;
  logout: Message;
  templateById: Template;
  templates: Array<Template>;
  userById: Array<User>;
  users: Array<User>;
  variableById: Variable;
  variables: Array<Variable>;
};


export type QueryFolderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryImageByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};


export type QueryTemplateByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryVariableByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Template = {
  __typename?: 'Template';
  config: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  user: User;
  variables: Array<Variable>;
};

export type TemplateInput = {
  config: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  images: Array<ImageInput>;
  name: Scalars['String']['input'];
  user: UserInput;
  variables: Array<VariableInput>;
};

export type UpdateFolderInput = {
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<ImageInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
};

export type UpdateImageInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
};

export type UpdateTemplateInput = {
  Images?: InputMaybe<Array<ImageInput>>;
  config?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
  variables?: InputMaybe<Array<VariableInput>>;
};

export type UpdateUserInput = {
  billing_date?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  mail: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVariableInput = {
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  billing_date?: Maybe<Scalars['String']['output']>;
  folders: Array<Template>;
  id: Scalars['Float']['output'];
  images: Array<Image>;
  mail: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  templates: Array<Template>;
  username: Scalars['String']['output'];
  variables: Array<Variable>;
};

export type UserInput = {
  billing_date?: InputMaybe<Scalars['String']['input']>;
  folders: Array<TemplateInput>;
  id: Scalars['Float']['input'];
  images: Array<ImageInput>;
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  templates: Array<TemplateInput>;
  username: Scalars['String']['input'];
  variables: Array<VariableInput>;
};

export type Variable = {
  __typename?: 'Variable';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  user: User;
  value: Scalars['String']['output'];
};

export type VariableInput = {
  id: Scalars['Float']['input'];
  label: Scalars['String']['input'];
  user: UserInput;
  value: Scalars['String']['input'];
};

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser: { __typename?: 'User', mail: string, username: string, password: string } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };


export const CreateUserDocument = gql`
    mutation CreateUser($user: CreateUserInput!) {
  CreateUser(user: $user) {
    mail
    username
    password
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    success
    message
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;