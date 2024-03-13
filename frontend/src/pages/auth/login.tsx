import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import LoginLayout from "@/components/layout-elements/LoginLayout";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";

type FieldType = {
  mail: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
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
          name="maim"
          rules={[{ required: true, message: "Please input your mail!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
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
    <LoginLayout title="login" fullWidthImage>
      {page}
    </LoginLayout>
  );
};

export default Login;
