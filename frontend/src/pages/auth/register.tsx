import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

import { Button, Flex, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import {
	CreateUserMutation,
	CreateUserMutationVariables,
} from '@/types/graphql';
import { REGISTER } from '../../request/mutations/auth.mutations';
import LoginLayout from '@/components/layout-elements/LoginLayout';

const Register: NextPageWithLayout = () => {
	type InputRegister = {
		mail?: string;
		username?: string;
		password?: string;
		confirmPassword?: string;
	};
	const router = useRouter();

	const [register, { error }] = useMutation<
		CreateUserMutation,
		CreateUserMutationVariables
	>(REGISTER, {
		onCompleted: (data) => {
			router.push('/auth/login');
		},
		onError: (error) => {
			console.error('err: ', error);
		},
	});
	const onFinish = (values: InputRegister) => {
		if (
			values.mail &&
			values.password &&
			values.username &&
			values.confirmPassword &&
			values.password == values.confirmPassword
		) {
			register({
				variables: {
					user: {
						mail: values.mail,
						password: values.password,
						username: values.username,
					},
				},
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.error('Failed:', errorInfo);
	};

	return (
		<Flex vertical className="w-[80%]">
			<Form
				name="register"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				className="max-w-[600px]"
			>
				<Form.Item<InputRegister>
					name="mail"
					rules={[{ required: true, message: 'Please enter your mail!' }]}
				>
					<Input placeholder="Mail" />
				</Form.Item>

				<Form.Item<InputRegister>
					name="username"
					rules={[{ required: true, message: 'Please enter your username!' }]}
				>
					<Input placeholder="Username" />
				</Form.Item>

				<Form.Item<InputRegister>
					name="password"
					rules={[{ required: true, message: 'Please enter your password!' }]}
				>
					<Input.Password placeholder="Password" />
				</Form.Item>

				<Form.Item<InputRegister>
					name="confirmPassword"
					rules={[{ required: true, message: 'Please confirm your password!' }]}
				>
					<Input.Password placeholder="Confirm your password" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Sign up
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	);
};

Register.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout
			title="Welcome, new Artisan !"
			description="Your life is getting easier !"
			fullWidthImage
		>
			{page}
		</LoginLayout>
	);
};

export default Register;
