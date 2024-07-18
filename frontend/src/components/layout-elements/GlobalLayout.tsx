import { Alert, Divider, Layout, Space, Spin, Typography } from 'antd';
import Sidebar from './Sidebar';
import { GlobalLayoutProps } from '../types';
import { useBreackPoint } from '@/Contexts/BreackPointContext';
import Header from './Header/Header';
import { useUser } from '@/Contexts/UserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Content } = Layout;
const { Title, Text } = Typography;

const GlobalLayout = ({
	children,
	title,
	description,
	action,
	hidden = false,
}: GlobalLayoutProps) => {
	const { isMobile, setIsMobile } = useBreackPoint();
	const [loading, setLoading] = useState(true);
	const { user, verifyUser } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) verifyUser(() => setLoading(false));
		else setLoading(false);
	}, []);

	if (loading)
		return (
			<Spin tip="Loading...">
				<Alert
					message="Page is loading"
					description="Please wait til we verify you are connected."
					type="info"
				/>
			</Spin>
		);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header user={user} isLayout />
			{!hidden ? (
				<Layout hasSider style={{ width: '100%'}}>
					<Sidebar />
					<Content style={{ margin: '0px 16px', height: '100%' }}>
						<div style={{ padding: 24, minHeight: 360 }}>
							<div className="pb-8 border-b">
								<Title level={2}>{title}</Title>
								<Text type="secondary" style={{ fontSize: 16 }}>
									{description}
								</Text>
								<Divider />
							</div>
							{children}
						</div>
					</Content>
				</Layout>
			) : (
				<Content className='flex flex-grow w-full h-full'>{children}</Content>
			)}
		</Layout>
	);
};

export default GlobalLayout;
