import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import LoginLayout from "@/components/layout-elements/LoginLayout";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { useLazyQuery } from "@apollo/client";
import { QueryLoginArgs } from "@/types/graphql";
import { LOGIN } from "@/request/queries/auth.queries";


const  Login: NextPageWithLayout = () => {
type InputLogin = {
    mail: string;
    password: string;
    remember?: string;
  };

  const [login, { data, error }] = useLazyQuery<
    InputLogin,
    QueryLoginArgs
  >(LOGIN);
  const onFinish = (values: any) => {
    if (values.mail && values.password) {
      login({
        variables: { infos: { mail: values.mail, password: values.password } },
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
      <Input placeholder="Mail"/>
    </Form.Item>

    <Form.Item<InputLogin>
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
		<LoginLayout title='Good to see you !' fullWidthImage >
			{page}
		</LoginLayout>
	);
};

export default Login;