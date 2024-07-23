import { Button, Drawer, Grid, Image, Layout, Space, Typography } from 'antd';
import ProfileButton from '../ProfilButton';
import { useEffect, useState } from 'react';
import { MenuOutlined, CrownFilled } from '@ant-design/icons';
import MenuComponents from './Menu';
import Link from 'next/link';
import { useBreackPoint } from '@/Contexts/BreackPointContext';
import { useUser } from '@/Contexts/UserContext';

const { Header: AntHeader } = Layout;

const { useBreakpoint } = Grid;
const { Title } = Typography;

const Header = ({
	isLayout = true,
} : {
	isLayout: boolean;
}) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { logout, user } = useUser();

	const screens = useBreakpoint();
	const breackPoint = Object.entries(screens).filter((screen) => !!screen[1]);
	const { isMobile, setIsMobile } = useBreackPoint();
	const setBreackPoint = (breackPoint: any[]) => {
		if (!breackPoint) return;
		if (breackPoint[1] && breackPoint[1][2] && breackPoint[2])
			!breackPoint[2][2] ? setIsMobile(true) : setIsMobile(false);
	};

	useEffect(() => setBreackPoint(breackPoint), [breackPoint]);

	console.log(user);
	const premium = user.role;
	console.log("premium ? -> ", premium);

	return (
		<>
			<AntHeader
				style={{
					backgroundColor: '#D9D9D9',
					position: 'sticky',
					top: 0,
					zIndex: 1,
				}}
				className="!px-2 !h-[7vh]"
			>
				<div className="flex items-center justify-between h-full">
					<Space>
						<Link href={user ? '/dashboard' : '/'}>
							<Image
								// src="/logo.svg"
								src="/logo-typo.png"
								alt="inboxArtisan Logo"
								preview={false}
								width={65}
								// height={64}
							/>
						</Link>
						{/* {!isMobile ? <Title level={3}>InboxArtisan</Title> : null} */}
					</Space>
					{isLayout ? (
						<Space>
							<Button type="primary" icon={<CrownFilled />}>Premium</Button>
							<ProfileButton user={user} />
							{isMobile && (
								<Button ghost onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
									<MenuOutlined />
								</Button>
							)}
							<Drawer
								open={isDrawerOpen}
								style={{ background: '#CACACA', maxWidth: '200px' }}
								styles={{
									body: { padding: 0, margin: 0 },
									wrapper: { maxWidth: '200px' },
								}}
								onClose={() => setIsDrawerOpen(false)}
							>
								<MenuComponents />
							</Drawer>
						</Space>
					) : (
						<Space>
							{!user && (
								<>
									<Button href="/auth/login" size="large">Log in</Button>
									<Button href="/auth/register" type="primary" size="large">Sign up</Button>
								</>
							)}
							{user && (
								<>
									<Button href="/dashboard" type="primary" size="large">Dashboard</Button>
									<Button type="primary" size="large" danger
										href="/"
										onClick={() => {
											logout();
										}}
									>
										Sign out
									</Button>
								</>
							)}
						</Space>
					)}
				</div>
			</AntHeader>
		</>
	);
};

export default Header;
