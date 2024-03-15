import { Divider, Layout, Typography } from 'antd';
import Sidebar from './Sidebar';
import { GlobalLayoutProps } from '../types';
import { useBreackPoint } from '@/Contexts/BreackPointContext';
import Header from './Header/Header';

const { Content } = Layout;
const { Title, Text } = Typography;

const GlobalLayout = ({ children, title, description }: GlobalLayoutProps) => {
	const { isMobile, setIsMobile } = useBreackPoint();
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header user={null} isLayout />
			<Layout hasSider style={{ width: '100%' }}>
				<Sidebar />
				<Content style={{ margin: '0px 16px' }}>
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
		</Layout>
	);
};

export default GlobalLayout;
