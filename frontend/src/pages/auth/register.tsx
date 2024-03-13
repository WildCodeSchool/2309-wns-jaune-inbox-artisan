import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import RegisterLayout from "@/components/layout-elements/LoginLayout";
import { Button, Flex, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { InputRegister, RegisterMutation, RegisterMutationVariables } from "@/types/graphql";
import { REGISTER } from "../../request/mutations/auth.mutations";

const Register: NextPageWithLayout = () => {
  const router = useRouter();

  const [register, { error }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER, {
    onCompleted: (data) => {
      console.log(data)
      router.push("/auth/login");
    },
    onError: (error) => {
      console.log('err: ',error)
    }
  }); 
  const onFinish = (values: InputRegister) => {
    if (values.mail && values.password && values.username && values.confirmPassword) {
      register({
        variables: { user: { mail: values.mail, password: values.password,username: values.username } },
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    mail?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
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
        <Form.Item<FieldType>
          name="mail"
          rules={[{ required: true, message: "Please enter your mail!" }]}
        >
          <Input placeholder="Mail" />
        </Form.Item>

        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
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
    <RegisterLayout
      title="Welcome, new Artisan !"
      subtitle="Your life is getting easier !"
      fullWidthImage
    >
      {page}
    </RegisterLayout>
  );
};

export default Register;
