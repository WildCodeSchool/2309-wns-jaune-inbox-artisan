import LoginLayout from '@/components/layout-elements/LoginLayout';
import { Button, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from './_app';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

const { Title, Text } = Typography;

const Home: NextPageWithLayout = () => {
	return (
		<main className="grid lg:grid-cols-12 gap-10 text-center my-20">
			<Title className='mx-12 font-bold lg:col-span-full'>A Fabulous email template builder</Title>
			<Text className='mx-12 col-span-full'>Create a beautiful mail template with an easy drag-and-drop interface. <br />Just drop elements to build your template, it’s that easy!</Text>
			<Button className='w-fit m-auto lg:col-span-full' type="primary" size={'large'}>Try it for Free!</Button>
			<Image
				className='w-4/5 m-h-[70vh] m-auto object-contain lg:col-start-3 lg:col-span-4'
				src="/images/app-exemple.png"
				width={500}
				height={500}
				alt="Picture of the author"
			/>
			<div className='mx-12 lg:col-end-11 lg:col-span-4 flex items-center'>
				<Title level={2} className='lg:text-left'>Be a part of the revolution, and gain in productivity with the fastest templating tool!</Title>
			</div>
		</main>
	);
}

export default Home