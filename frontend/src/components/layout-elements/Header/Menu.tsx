import {
	FormOutlined,
	HighlightOutlined,
	ProfileOutlined,
	TableOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { MenuItem } from '../types';
import { Key, ReactNode } from 'react';
import Link from 'next/link';

const setNavigationItem = (
	label: React.ReactNode,
	key: Key,
	icon?: ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem =>
	({
		key,
		icon,
		children,
		label,
		type,
		style: { marginBottom: 16 },
		className: 'bg-[#218380]',
	} as MenuItem);

const NAVIGATIONITEMS: MenuItem[] = [
	setNavigationItem(
		<Link href="/dashboard" title="Dashboard">
			Dashboard
		</Link>,
		'1',
		<FormOutlined />
	),
	setNavigationItem(
		<Link href="/library" title="Library">
			Library
		</Link>,
		'2',
		<TableOutlined />
	),
	setNavigationItem(
		<Link href="/editor" title="Editor">
			Editor
		</Link>,
		'3',
		<ProfileOutlined />
	),
	setNavigationItem(
		<Link href="/settings" title="Settings">
			Settings
		</Link>,
		'4',
		<HighlightOutlined />
	),
];

const MenuComponents = () => (
	<Menu
		defaultSelectedKeys={['1']}
		items={NAVIGATIONITEMS}
		mode="inline"
		theme="dark"
	/>
);

export default MenuComponents;
