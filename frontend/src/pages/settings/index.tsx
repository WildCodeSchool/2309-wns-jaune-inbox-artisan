import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Button, Form, type FormProps, Input, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import React from 'react';
import {
	CreateVariableInput,
	InsertVariablesMutation,
	InsertVariablesMutationVariables,
	VariablesQuery,
	VariablesQueryVariables,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { INSERT_VARIABLES } from '@/request/mutations/settings.mutations';
import { LIST_VARIABLES } from '@/request/queries/settings.queries';
import router from 'next/router';

const { Title } = Typography;

const Settings: NextPageWithLayout = () => {
	const [submittable, setSubmittable] = React.useState<boolean>(false);

	const [insertVariables] = useMutation<
		InsertVariablesMutation,
		InsertVariablesMutationVariables
	>(INSERT_VARIABLES, {
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			// if (data.login.success) {
			router.push('/settings');
			// }
		},
	});

	const onFinishVariables = (values: { variables: CreateVariableInput[] }) => {
		// console.log("values avant insert :");
		// console.log(values);
		insertVariables({ variables: values });
	};

	// const onFinishFailedVariables: FormProps<VariablesFieldType>["onFinishFailed"] = (
	//   errorInfo
	// ) => {
	//   console.log("Failed:", errorInfo);
	// };

	// QUERY DE LISTE DES VARIABLES
	const [variablesForm] = Form.useForm();

	const omitTypename = (key: string, value: string) =>
		key === '__typename' ? undefined : value;

	const { data } = useQuery<VariablesQuery, VariablesQueryVariables>(
		LIST_VARIABLES,
		{
			fetchPolicy: 'no-cache',
			onCompleted(data) {
				const dataWithoutTypename = JSON.parse(
					JSON.stringify(data),
					omitTypename
				);

				// variablesForm.setFieldsValue(dataWithoutTypename);

				// Affichange dans l'odre croissant des id
				let sortedData = { variables: [] };

				sortedData.variables = dataWithoutTypename.variables.sort(
					(a: any, b: any) => parseInt(a.id) - parseInt(b.id)
				);
				// console.log(sortedData);

				variablesForm.setFieldsValue(sortedData);
			},
		}
	);

	return (
		<main className={`flex flex-col items-center justify-between`}>
			<Title level={3}>Account</Title>
			<Form
				// form={form}
				name="accountForm"
				style={{ minWidth: '20%' }}
				autoComplete="off"
				initialValues={{
					mail: 'mail@test.fr',
				}}
			>
				<Form.Item<UserFieldType>
					label=""
					name="mail"
					rules={[{ required: true, message: 'Please input your mail!' }]}
				>
					<Input placeholder="Mail" />
				</Form.Item>

				<Form.Item<UserFieldType>
					label=""
					name="newPassword"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password placeholder="New password" />
				</Form.Item>

				<Form.Item<UserFieldType>
					label=""
					name="confirmNewPassword"
					dependencies={['password']}
					rules={[
						{
							required: true,
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('newPassword') === value) {
									setSubmittable(true);
									return Promise.resolve();
								}
								setSubmittable(false);
								return Promise.reject(
									new Error('The new password that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input.Password placeholder="Confirm new password" />
				</Form.Item>
				<Form.Item style={{ textAlign: 'center' }}>
					<Button type="primary" htmlType="submit" disabled={!submittable}>
						Save
					</Button>
				</Form.Item>
			</Form>

			<Title level={3} className="mt-12">
				Variables
			</Title>

			<Form
				form={variablesForm}
				name="dynamic_form_nest_item"
				// onFinish={insertVariableMutation}
				onFinish={onFinishVariables}
				// onFinishFailed={onFinishFailedVariables}
				style={{ maxWidth: 600 }}
				autoComplete="off"
			>
				<Form.List name="variables">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{ display: 'flex', marginBottom: 8 }}
									align="baseline"
								>
									<Form.Item<VariablesFieldType[]>
										{...restField}
										name={[name, 'label']}
										rules={[
											{ required: true, message: 'Missing variable name' },
										]}
									>
										<Input placeholder="Variable name" />
									</Form.Item>
									<Form.Item<VariablesFieldType[]>
										{...restField}
										name={[name, 'value']}
										rules={[
											{ required: true, message: 'Missing variable value' },
										]}
									>
										<Input placeholder="Value" />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add Variable
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item style={{ textAlign: 'center' }}>
					<Button type="primary" htmlType="submit">
						Save Variables
					</Button>
				</Form.Item>
			</Form>
		</main>
	);
};

Settings.getLayout = function getLayout(page: ReactElement) {
	return (
		<GlobalLayout title="Settings" description="Change your account settings">
			{page}
		</GlobalLayout>
	);
};

export default Settings;
