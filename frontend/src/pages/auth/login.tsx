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
    mail?: string;
    password?: string;
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


Login.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout title='Good to see you !' subtitle="Drag and drop is addictive isn’t it ?" fullWidthImage >
			{page}
		</LoginLayout>
	)
}

export default Login;
