import { Button, Layout } from 'antd';
import Sidebar from './Sidebar';
import { GlobalLayoutPropsType } from '../types';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import { useBreackPoint } from '@/Contexts/BreackPointContext';

const { Content } = Layout;

const GlobalLayout = ({ children }: GlobalLayoutPropsType) => {
	const { isMobile, setIsMobile } = useBreackPoint();

	return (
		<Layout style={{ minHeight: '100vh', flexDirection: 'column' }}>
			<Header user={null} isLayout />
			<Layout hasSider style={{ width: '100%' }}>
				<Sidebar />
				<Content style={{ margin: '0px 16px' }}>
					<div style={{ padding: 24, minHeight: 360 }}>{children}</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default GlobalLayout;
