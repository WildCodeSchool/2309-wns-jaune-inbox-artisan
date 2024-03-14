import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { Button, Checkbox, Form, type FormProps, Input, Space, Typography, FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import GlobalLayout from "@/components/layout-elements/GlobalLayout";
import React from "react";

const { Title } = Typography;

type FieldType = {
  mail: string;
  newPassword: string;
  confirmNewPassword: string;
};

const Settings: NextPageWithLayout = () => {
  const [form] = Form.useForm<FieldType>();
  
  const [submittable, setSubmittable] = React.useState<boolean>(false);

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
      className={`flex min-h-screen flex-col items-center justify-between`}
    >
      <Title level={3} className='lg:text-left'>Account</Title>
      <Form
        form={form}
        name="accountForm"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{ 
          mail: "mail@test.fr"
        }}
      >

        <Form.Item<FieldType>
          label="Mail"
          name="mail"
          rules={[{ required: true, message: "Please input your mail!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="New password"
          name="newPassword"
          rules={[{ 
            required: true, 
            message: "Please input your password!",
          }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm new password"
          name="confirmNewPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  setSubmittable(true)
                  return Promise.resolve();
                }
                setSubmittable(false)
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button 
            type="primary"
            htmlType="submit"
            disabled={!submittable}
          >
            Save
          </Button>
        </Form.Item>
      </Form>

      <Title level={3}>Variables</Title>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ 
          variables: [
            {
              name: "Var 1", 
              value: "Value de Var 1"
            },
            {
              name: "Var 2", 
              value: "Value de Var 2"
            },
          ] 
        }}
      >
        <Form.List name="variables">
          
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing variable name' }]}
                  >
                    <Input placeholder="Variable name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Value' }]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <GlobalLayout 
      title="Settings"
      description="Change your account settings"
    >
      {page}
    </GlobalLayout>
  );
};

export default Settings;
