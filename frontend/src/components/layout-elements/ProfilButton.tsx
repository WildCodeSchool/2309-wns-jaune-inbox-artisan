import React from 'react';

import { Avatar, Button, Dropdown, MenuProps, Typography } from 'antd';
import Link from 'next/link';

const { Text } = Typography;

const ProfileButton: React.FC<{ user: any }> = ({ user }) => {
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link href="/">Se déconnecter</Link>,
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={['click']}>
			<Button
				type="primary"
				className=" !flex !h-auto !leading-normal !items-center !gap-2 !px-3 !py-2 !border !border-[#d9d9d9] !cursor-pointer !rounded-md !bg-[#94E8B4]"
			>
				<Text strong className="text-center w-full">
					{user?.pseudo || 'pseudo'}
				</Text>
			</Button>
		</Dropdown>
	);
};

export default ProfileButton;
