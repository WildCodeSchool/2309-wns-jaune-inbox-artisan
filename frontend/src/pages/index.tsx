import { Button, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

const { Title, Text } = Typography;

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<Title>Accueil</Title>
			<Text>Coucou</Text>
			<Button>Accueil</Button>
		</main>
	);
}
