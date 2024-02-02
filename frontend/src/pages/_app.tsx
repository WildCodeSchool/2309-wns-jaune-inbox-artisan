import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import Layout from '@/components/layout-elements/Layout';
import dynamic from 'next/dynamic';

const Layout = dynamic(
	async () => await import('../components/layout-elements/Layout'),
	{
		ssr: false,
	}
);

import React from 'react';
// import theme from '@/theme/themeConfig';

export default function App({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		uri: 'http://localhost:4000',
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}
