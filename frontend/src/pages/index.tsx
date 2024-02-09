import LoginLayout from '@/components/layout-elements/LoginLayout';
import { Button, Typography } from 'antd';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from './_app';

const inter = Inter({ subsets: ['latin'] });

const { Title } = Typography;

const Home: NextPageWithLayout = () => {
	return (
		<main>
			<Title>Accueil</Title>
		</main>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<LoginLayout title='login' fullWidthImage >
			{page}
		</LoginLayout>
	)
}

export default Home