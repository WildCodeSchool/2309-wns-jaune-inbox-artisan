import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import LoginLayout from '@/components/layout-elements/LoginLayout';
import { Button, Checkbox, Form, type FormProps, Input, Grid } from 'antd';

type FieldType = {
	username: string;
	mail: string;
	password: string;
	confirmPassword: string;
};
function Register() {
	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
		errorInfo
	) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<main className={`flex flex-col items-center justify-between p-24`}>
			<Form
				name="basic"
				labelCol={{ span: 12 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label="Mail"
					name="mail"
					rules={[{ required: true, message: 'Please input your mail!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item<FieldType>
					label="confirm password"
					name="confirmPassword"
					rules={[{ required: true, message: 'Please confirm your password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</main>
	);
}

Register.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout title="register" fullWidthImage>
			{page}
		</LoginLayout>
	);
};

export default Register;
