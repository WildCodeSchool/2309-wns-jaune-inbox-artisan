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
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
  userId: Scalars['Float']['input'];
};

export type CreateImageInput = {
  folderId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
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
  id?: InputMaybe<Scalars['ID']['input']>;
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
  folder: Scalars['ID']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
  user: User;
};

export type ImageInput = {
  folder: Scalars['ID']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
  user: UserInput;
};

export type InputLogin = {
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  expirationDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user: LoginResponse;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteFolder: Scalars['Boolean']['output'];
  deleteImage: Scalars['Boolean']['output'];
  deleteTemplate: Template;
  deleteUser: User;
  deleteVariables: Array<Variable>;
  insertFolder: Scalars['Boolean']['output'];
  insertImage: Scalars['Boolean']['output'];
  insertTemplate: Template;
  insertVariables: Scalars['Boolean']['output'];
  updateFolder: Scalars['Boolean']['output'];
  updateImage: Scalars['Boolean']['output'];
  updateTemplate: Template;
  updateUser: User;
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


export type MutationDeleteVariablesArgs = {
  ids: Array<Scalars['Float']['input']>;
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


export type MutationInsertVariablesArgs = {
  variables: Array<CreateVariableInput>;
};


export type MutationUpdateFolderArgs = {
  folder: UpdateFolderInput;
};


export type MutationUpdateImageArgs = {
  image: UpdateImageInput;
};


export type MutationUpdateTemplateArgs = {
  user: UpdateTemplateInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  folderById: Array<Folder>;
  folderByUserId: Array<Folder>;
  folders: Array<Folder>;
  imageByFolderId: Array<Image>;
  imageById: Image;
  imageByUserId: Array<Image>;
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
  id: Scalars['Float']['input'];
};


export type QueryFolderByUserIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryImageByFolderIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryImageByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryImageByUserIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};


export type QueryTemplateByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryTemplatesArgs = {
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
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
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
  mail?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  value?: Maybe<Scalars['String']['output']>;
};

export type VariableInput = {
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInput>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', mail: string, username: string, password: string } };

export type DeleteFolderMutationVariables = Exact<{
  deleteFolderId: Scalars['Float']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', deleteFolder: boolean };

export type InsertFolderMutationVariables = Exact<{
  folder: CreateFolderInput;
}>;


export type InsertFolderMutation = { __typename?: 'Mutation', insertFolder: boolean };

export type UpdateFolderMutationVariables = Exact<{
  folder: UpdateFolderInput;
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', updateFolder: boolean };

export type DeleteImageMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteImageMutation = { __typename?: 'Mutation', deleteImage: boolean };

export type InsertImageMutationVariables = Exact<{
  image: CreateImageInput;
}>;


export type InsertImageMutation = { __typename?: 'Mutation', insertImage: boolean };

export type UpdateImageMutationVariables = Exact<{
  image: UpdateImageInput;
}>;


export type UpdateImageMutation = { __typename?: 'Mutation', updateImage: boolean };

export type InsertVariablesMutationVariables = Exact<{
  variables: Array<CreateVariableInput> | CreateVariableInput;
}>;


export type InsertVariablesMutation = { __typename?: 'Mutation', insertVariables: boolean };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string, user: { __typename?: 'LoginResponse', id: string, username?: string | null, expirationDate: string } } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type FolderByUserIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type FolderByUserIdQuery = { __typename?: 'Query', folderByUserId: Array<{ __typename?: 'Folder', id: number, name: string, images: Array<{ __typename?: 'Image', id: number, name: string, url: string }> }> };

export type ImageByUserIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ImageByUserIdQuery = { __typename?: 'Query', imageByUserId: Array<{ __typename?: 'Image', id: number, name: string, url: string }> };

export type ImageByFolderIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ImageByFolderIdQuery = { __typename?: 'Query', imageByFolderId: Array<{ __typename?: 'Image', id: number, name: string, url: string }> };

export type VariablesQueryVariables = Exact<{ [key: string]: never; }>;


export type VariablesQuery = { __typename?: 'Query', variables: Array<{ __typename?: 'Variable', id: string, label?: string | null, value?: string | null }> };

export type TemplatesQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type TemplatesQuery = { __typename?: 'Query', templates: Array<{ __typename?: 'Template', id: number, name: string }> };


export const CreateUserDocument = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
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
export const DeleteFolderDocument = gql`
    mutation DeleteFolder($deleteFolderId: Float!) {
  deleteFolder(id: $deleteFolderId)
}
    `;
export type DeleteFolderMutationFn = Apollo.MutationFunction<DeleteFolderMutation, DeleteFolderMutationVariables>;

/**
 * __useDeleteFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFolderMutation, { data, loading, error }] = useDeleteFolderMutation({
 *   variables: {
 *      deleteFolderId: // value for 'deleteFolderId'
 *   },
 * });
 */
export function useDeleteFolderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFolderMutation, DeleteFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument, options);
      }
export type DeleteFolderMutationHookResult = ReturnType<typeof useDeleteFolderMutation>;
export type DeleteFolderMutationResult = Apollo.MutationResult<DeleteFolderMutation>;
export type DeleteFolderMutationOptions = Apollo.BaseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const InsertFolderDocument = gql`
    mutation InsertFolder($folder: CreateFolderInput!) {
  insertFolder(folder: $folder)
}
    `;
export type InsertFolderMutationFn = Apollo.MutationFunction<InsertFolderMutation, InsertFolderMutationVariables>;

/**
 * __useInsertFolderMutation__
 *
 * To run a mutation, you first call `useInsertFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFolderMutation, { data, loading, error }] = useInsertFolderMutation({
 *   variables: {
 *      folder: // value for 'folder'
 *   },
 * });
 */
export function useInsertFolderMutation(baseOptions?: Apollo.MutationHookOptions<InsertFolderMutation, InsertFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertFolderMutation, InsertFolderMutationVariables>(InsertFolderDocument, options);
      }
export type InsertFolderMutationHookResult = ReturnType<typeof useInsertFolderMutation>;
export type InsertFolderMutationResult = Apollo.MutationResult<InsertFolderMutation>;
export type InsertFolderMutationOptions = Apollo.BaseMutationOptions<InsertFolderMutation, InsertFolderMutationVariables>;
export const UpdateFolderDocument = gql`
    mutation UpdateFolder($folder: UpdateFolderInput!) {
  updateFolder(folder: $folder)
}
    `;
export type UpdateFolderMutationFn = Apollo.MutationFunction<UpdateFolderMutation, UpdateFolderMutationVariables>;

/**
 * __useUpdateFolderMutation__
 *
 * To run a mutation, you first call `useUpdateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFolderMutation, { data, loading, error }] = useUpdateFolderMutation({
 *   variables: {
 *      folder: // value for 'folder'
 *   },
 * });
 */
export function useUpdateFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFolderMutation, UpdateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument, options);
      }
export type UpdateFolderMutationHookResult = ReturnType<typeof useUpdateFolderMutation>;
export type UpdateFolderMutationResult = Apollo.MutationResult<UpdateFolderMutation>;
export type UpdateFolderMutationOptions = Apollo.BaseMutationOptions<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const DeleteImageDocument = gql`
    mutation DeleteImage($id: Float!) {
  deleteImage(id: $id)
}
    `;
export type DeleteImageMutationFn = Apollo.MutationFunction<DeleteImageMutation, DeleteImageMutationVariables>;

/**
 * __useDeleteImageMutation__
 *
 * To run a mutation, you first call `useDeleteImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageMutation, { data, loading, error }] = useDeleteImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteImageMutation, DeleteImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteImageMutation, DeleteImageMutationVariables>(DeleteImageDocument, options);
      }
export type DeleteImageMutationHookResult = ReturnType<typeof useDeleteImageMutation>;
export type DeleteImageMutationResult = Apollo.MutationResult<DeleteImageMutation>;
export type DeleteImageMutationOptions = Apollo.BaseMutationOptions<DeleteImageMutation, DeleteImageMutationVariables>;
export const InsertImageDocument = gql`
    mutation InsertImage($image: CreateImageInput!) {
  insertImage(image: $image)
}
    `;
export type InsertImageMutationFn = Apollo.MutationFunction<InsertImageMutation, InsertImageMutationVariables>;

/**
 * __useInsertImageMutation__
 *
 * To run a mutation, you first call `useInsertImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertImageMutation, { data, loading, error }] = useInsertImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useInsertImageMutation(baseOptions?: Apollo.MutationHookOptions<InsertImageMutation, InsertImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertImageMutation, InsertImageMutationVariables>(InsertImageDocument, options);
      }
export type InsertImageMutationHookResult = ReturnType<typeof useInsertImageMutation>;
export type InsertImageMutationResult = Apollo.MutationResult<InsertImageMutation>;
export type InsertImageMutationOptions = Apollo.BaseMutationOptions<InsertImageMutation, InsertImageMutationVariables>;
export const UpdateImageDocument = gql`
    mutation UpdateImage($image: UpdateImageInput!) {
  updateImage(image: $image)
}
    `;
export type UpdateImageMutationFn = Apollo.MutationFunction<UpdateImageMutation, UpdateImageMutationVariables>;

/**
 * __useUpdateImageMutation__
 *
 * To run a mutation, you first call `useUpdateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImageMutation, { data, loading, error }] = useUpdateImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImageMutation, UpdateImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateImageMutation, UpdateImageMutationVariables>(UpdateImageDocument, options);
      }
export type UpdateImageMutationHookResult = ReturnType<typeof useUpdateImageMutation>;
export type UpdateImageMutationResult = Apollo.MutationResult<UpdateImageMutation>;
export type UpdateImageMutationOptions = Apollo.BaseMutationOptions<UpdateImageMutation, UpdateImageMutationVariables>;
export const InsertVariablesDocument = gql`
    mutation InsertVariables($variables: [CreateVariableInput!]!) {
  insertVariables(variables: $variables)
}
    `;
export type InsertVariablesMutationFn = Apollo.MutationFunction<InsertVariablesMutation, InsertVariablesMutationVariables>;

/**
 * __useInsertVariablesMutation__
 *
 * To run a mutation, you first call `useInsertVariablesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertVariablesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertVariablesMutation, { data, loading, error }] = useInsertVariablesMutation({
 *   variables: {
 *      variables: // value for 'variables'
 *   },
 * });
 */
export function useInsertVariablesMutation(baseOptions?: Apollo.MutationHookOptions<InsertVariablesMutation, InsertVariablesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertVariablesMutation, InsertVariablesMutationVariables>(InsertVariablesDocument, options);
      }
export type InsertVariablesMutationHookResult = ReturnType<typeof useInsertVariablesMutation>;
export type InsertVariablesMutationResult = Apollo.MutationResult<InsertVariablesMutation>;
export type InsertVariablesMutationOptions = Apollo.BaseMutationOptions<InsertVariablesMutation, InsertVariablesMutationVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    success
    user {
      id
      username
      expirationDate
    }
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
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const FolderByUserIdDocument = gql`
    query FolderByUserId($id: Float!) {
  folderByUserId(id: $id) {
    id
    name
    images {
      id
      name
      url
    }
  }
}
    `;

/**
 * __useFolderByUserIdQuery__
 *
 * To run a query within a React component, call `useFolderByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFolderByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFolderByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFolderByUserIdQuery(baseOptions: Apollo.QueryHookOptions<FolderByUserIdQuery, FolderByUserIdQueryVariables> & ({ variables: FolderByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FolderByUserIdQuery, FolderByUserIdQueryVariables>(FolderByUserIdDocument, options);
      }
export function useFolderByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FolderByUserIdQuery, FolderByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FolderByUserIdQuery, FolderByUserIdQueryVariables>(FolderByUserIdDocument, options);
        }
export function useFolderByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FolderByUserIdQuery, FolderByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FolderByUserIdQuery, FolderByUserIdQueryVariables>(FolderByUserIdDocument, options);
        }
export type FolderByUserIdQueryHookResult = ReturnType<typeof useFolderByUserIdQuery>;
export type FolderByUserIdLazyQueryHookResult = ReturnType<typeof useFolderByUserIdLazyQuery>;
export type FolderByUserIdSuspenseQueryHookResult = ReturnType<typeof useFolderByUserIdSuspenseQuery>;
export type FolderByUserIdQueryResult = Apollo.QueryResult<FolderByUserIdQuery, FolderByUserIdQueryVariables>;
export const ImageByUserIdDocument = gql`
    query imageByUserId($id: Float!) {
  imageByUserId(id: $id) {
    id
    name
    url
  }
}
    `;

/**
 * __useImageByUserIdQuery__
 *
 * To run a query within a React component, call `useImageByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ImageByUserIdQuery, ImageByUserIdQueryVariables> & ({ variables: ImageByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageByUserIdQuery, ImageByUserIdQueryVariables>(ImageByUserIdDocument, options);
      }
export function useImageByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageByUserIdQuery, ImageByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageByUserIdQuery, ImageByUserIdQueryVariables>(ImageByUserIdDocument, options);
        }
export function useImageByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ImageByUserIdQuery, ImageByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ImageByUserIdQuery, ImageByUserIdQueryVariables>(ImageByUserIdDocument, options);
        }
export type ImageByUserIdQueryHookResult = ReturnType<typeof useImageByUserIdQuery>;
export type ImageByUserIdLazyQueryHookResult = ReturnType<typeof useImageByUserIdLazyQuery>;
export type ImageByUserIdSuspenseQueryHookResult = ReturnType<typeof useImageByUserIdSuspenseQuery>;
export type ImageByUserIdQueryResult = Apollo.QueryResult<ImageByUserIdQuery, ImageByUserIdQueryVariables>;
export const ImageByFolderIdDocument = gql`
    query ImageByFolderId($id: Float!) {
  imageByFolderId(id: $id) {
    id
    name
    url
  }
}
    `;

/**
 * __useImageByFolderIdQuery__
 *
 * To run a query within a React component, call `useImageByFolderIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageByFolderIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageByFolderIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageByFolderIdQuery(baseOptions: Apollo.QueryHookOptions<ImageByFolderIdQuery, ImageByFolderIdQueryVariables> & ({ variables: ImageByFolderIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageByFolderIdQuery, ImageByFolderIdQueryVariables>(ImageByFolderIdDocument, options);
      }
export function useImageByFolderIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageByFolderIdQuery, ImageByFolderIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageByFolderIdQuery, ImageByFolderIdQueryVariables>(ImageByFolderIdDocument, options);
        }
export function useImageByFolderIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ImageByFolderIdQuery, ImageByFolderIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ImageByFolderIdQuery, ImageByFolderIdQueryVariables>(ImageByFolderIdDocument, options);
        }
export type ImageByFolderIdQueryHookResult = ReturnType<typeof useImageByFolderIdQuery>;
export type ImageByFolderIdLazyQueryHookResult = ReturnType<typeof useImageByFolderIdLazyQuery>;
export type ImageByFolderIdSuspenseQueryHookResult = ReturnType<typeof useImageByFolderIdSuspenseQuery>;
export type ImageByFolderIdQueryResult = Apollo.QueryResult<ImageByFolderIdQuery, ImageByFolderIdQueryVariables>;
export const VariablesDocument = gql`
    query Variables {
  variables {
    id
    label
    value
  }
}
    `;

/**
 * __useVariablesQuery__
 *
 * To run a query within a React component, call `useVariablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVariablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVariablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useVariablesQuery(baseOptions?: Apollo.QueryHookOptions<VariablesQuery, VariablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VariablesQuery, VariablesQueryVariables>(VariablesDocument, options);
      }
export function useVariablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VariablesQuery, VariablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VariablesQuery, VariablesQueryVariables>(VariablesDocument, options);
        }
export function useVariablesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VariablesQuery, VariablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VariablesQuery, VariablesQueryVariables>(VariablesDocument, options);
        }
export type VariablesQueryHookResult = ReturnType<typeof useVariablesQuery>;
export type VariablesLazyQueryHookResult = ReturnType<typeof useVariablesLazyQuery>;
export type VariablesSuspenseQueryHookResult = ReturnType<typeof useVariablesSuspenseQuery>;
export type VariablesQueryResult = Apollo.QueryResult<VariablesQuery, VariablesQueryVariables>;
export const TemplatesDocument = gql`
    query templates($id: Float!) {
  templates(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useTemplatesQuery__
 *
 * To run a query within a React component, call `useTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTemplatesQuery(baseOptions: Apollo.QueryHookOptions<TemplatesQuery, TemplatesQueryVariables> & ({ variables: TemplatesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, options);
      }
export function useTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, options);
        }
export function useTemplatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, options);
        }
export type TemplatesQueryHookResult = ReturnType<typeof useTemplatesQuery>;
export type TemplatesLazyQueryHookResult = ReturnType<typeof useTemplatesLazyQuery>;
export type TemplatesSuspenseQueryHookResult = ReturnType<typeof useTemplatesSuspenseQuery>;
export type TemplatesQueryResult = Apollo.QueryResult<TemplatesQuery, TemplatesQueryVariables>;