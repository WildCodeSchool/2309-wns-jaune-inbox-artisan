import { Image, Layout, Menu, Space } from 'antd';
import { useState, Key, ReactNode } from 'react';
import { MenuItem } from './types';
import Link from 'next/link';
import {
	FormOutlined,
	HighlightOutlined,
	ProfileOutlined,
	TableOutlined,
} from '@ant-design/icons';
import MenuComponents from './Header/Menu';
import { useBreackPoint } from '@/Contexts/BreackPointContext';

const { Sider } = Layout;

const Sidebar = () => {
	const [isSiderCollapsed, setIsSliderCollapsed] = useState(false);
	const { isMobile, setIsMobile } = useBreackPoint();

	return (
		<Sider
			breakpoint="md"
			onBreakpoint={(value) => {
				setIsMobile(value);
			}}
			collapsed={isSiderCollapsed}
			collapsible
			onCollapse={(value) => setIsSliderCollapsed(value)}
			style={{
				backgroundColor: '#CACACA',
				width: '100%',
				height: '93vh',
				display: isMobile ? 'none' : 'block',
				position: 'sticky',
				top: '7vh',
			}}
		>
			<MenuComponents />
		</Sider>
	);
};

export default Sidebar;
