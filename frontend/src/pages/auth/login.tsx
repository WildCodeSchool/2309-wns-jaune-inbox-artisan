import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import LoginLayout from "@/components/layout-elements/LoginLayout";
import { Button, Checkbox, Flex, Form, Input } from "antd";


const  Login: NextPageWithLayout = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    mail: string;
    password: string;
    remember?: string;
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
        <Form.Item<FieldType>
      name="mail"
      rules={[{ required: true, message: 'Please input your mail!' }]}
    >
      <Input placeholder="Mail"/>
    </Form.Item>

    <Form.Item<FieldType>
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password placeholder="Password"/>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>

      </Form>
    </Flex>
  );
}

const Login: NextPageWithLayout = () => {
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

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</main>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout title='Good to see you !' subtitle="Drag and drop is addictive isn’t it ?" fullWidthImage >

			{page}
		</LoginLayout>
	);
};

export default Login;
