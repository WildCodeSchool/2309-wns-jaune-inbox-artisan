import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import LoginLayout from "@/components/layout-elements/LoginLayout";

const  Login: NextPageWithLayout =() => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      Ici le formulaire de login
    </main>
  );
}


Login.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout title='login' fullWidthImage >
			{page}
		</LoginLayout>
	)
}

export default Login;
