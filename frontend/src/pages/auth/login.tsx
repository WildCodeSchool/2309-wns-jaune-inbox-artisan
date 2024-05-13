import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import LoginLayout from '@/components/layout-elements/LoginLayout';
import { Button, Flex, Form, Input } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { LoginQuery, QueryLoginArgs } from '@/types/graphql';
import { LOGIN } from '@/request/queries/auth.queries';
import { useRouter } from 'next/router';

const Login: NextPageWithLayout = () => {
	type InputLogin = {
		mail: string;
		password: string;
		remember?: string;
	};

	const router = useRouter()

	const [login, { data, error }] = useLazyQuery<LoginQuery, QueryLoginArgs>(
		LOGIN
	);
	const onFinish = (values: any) => {
		console.log(values)
		if (values.mail && values.password) {
			login({
				variables: { infos: { mail: values.mail, password: values.password } },
				onCompleted(data) {
					console.log(data)
					if (data.login.success) {
					  router.push("/");
					}
				}
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Flex vertical className="w-[80%]">
			<Form
				name="login"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				className="max-w-[600px]"
			>
				<Form.Item<InputLogin>
					name="mail"
					rules={[{ required: true, message: 'Please input your mail!' }]}
				>
					<Input placeholder="Mail" />
				</Form.Item>

				<Form.Item<InputLogin>
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password placeholder="Password" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout title="Good to see you !" fullWidthImage>
			{page}
		</LoginLayout>
	);
};

export default Login;
