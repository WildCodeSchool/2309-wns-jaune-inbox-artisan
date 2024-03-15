import { Button, Drawer, Grid, Image, Layout, Space, Typography } from 'antd';
import ProfileButton from '../ProfilButton';
import { useEffect, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import MenuComponents from './Menu';
import Link from 'next/link';
import { useBreackPoint } from '@/Contexts/BreackPointContext';

const { Header: AntHeader } = Layout;

const { useBreakpoint } = Grid;
const { Title } = Typography;

const Header = ({
	user,
	isLayout = true,
}: {
	user?: any;
	isLayout: boolean;
}) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const screens = useBreakpoint();
	const breackPoint = Object.entries(screens).filter((screen) => !!screen[1]);
	const { isMobile, setIsMobile } = useBreackPoint();

	const setBreackPoint = (breackPoint: any[]) => {
		if (!breackPoint) return;
		if (breackPoint[1] && breackPoint[1][2] && breackPoint[2])
			!breackPoint[2][2] ? setIsMobile(true) : setIsMobile(false);
	};

	useEffect(() => setBreackPoint(breackPoint), [breackPoint]);

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
						<Link href="/">
							<Image
								src="/logo.svg"
								alt="inboxArtisan Logo"
								preview={false}
								width={45}
							/>
						</Link>
						{!isMobile ? <Title level={3}>InboxArtisan</Title> : null}
					</Space>
					{isLayout ? (
						<Space>
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
							<Link
								className="!bg-[#218380] px-4 py-2 rounded-sm !text-[#ffffff]"
								href="/auth/login"
							>
								Log in
							</Link>
							<Link
								className="!bg-[#218380] px-3 py-2 rounded-sm !text-[#ffffff]"
								href="/auth/register"
							>
								Sign up
							</Link>
							<Link
								href="/auth/logout"
								replace={true}
								className="px-6 py-2 text-white transition duration-500 ease-out bg-red-700 rounded-lg hover:bg-red-800 hover:ease-in hover:underline"
							>
								Se déconnecter
							</Link>
						</Space>
					)}
				</div>
			</AntHeader>
		</>
	);
};

export default Header;
