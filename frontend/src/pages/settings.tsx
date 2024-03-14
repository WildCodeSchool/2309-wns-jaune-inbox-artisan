import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import GlobalLayout from "@/components/layout-elements/GlobalLayout";

type FieldType = {
  mail: string;
  password: string;
};

const Settings: NextPageWithLayout = () => {
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
    </main>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <GlobalLayout 
      title="Settings"
      description="Change your account"
    >
      {page}
    </GlobalLayout>
  );
};

export default Settings;
