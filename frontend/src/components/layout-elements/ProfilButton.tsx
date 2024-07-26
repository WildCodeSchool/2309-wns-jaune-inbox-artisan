import React from 'react';

import { Avatar, Button, Dropdown, MenuProps, Typography } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProfileButton: React.FC<{ user: any }> = ({ user }) => {
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link href="/">Sign out</Link>,
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={['click']}>
			<Button
				type="default"
				size="large"
				icon={<UserOutlined />}
				className="group"
			>
				<Text className="group-hover:!text-[#218380] transition-colors ease-in text-black">
					{user?.username ?? 'pseudo'}
				</Text>
			</Button>
		</Dropdown>
	);
};

export default ProfileButton;
