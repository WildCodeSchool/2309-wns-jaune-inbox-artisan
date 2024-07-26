import {
	Button,
	Divider,
	Drawer,
	Flex,
	Grid,
	Image,
	Layout,
	Space,
	Tooltip,
	Typography,
} from 'antd';
import ProfileButton from '../ProfilButton';
import { useEffect, useState } from 'react';
import { MenuOutlined, CrownFilled } from '@ant-design/icons';
import MenuComponents from './Menu';
import Link from 'next/link';
import { useBreackPoint } from '@/Contexts/BreackPointContext';
import { useUser } from '@/Contexts/UserContext';
import { useCreateUuidPaymentMutation } from '@/types/graphql';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

const { Header: AntHeader } = Layout;

const stripePromise = loadStripe(
	String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
);

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const Header = ({ isLayout = true }: { isLayout: boolean }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { logout, user } = useUser();

	const router = useRouter();
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
	// const premium = user.role;
	const premium = user.role === 'Premium' ? true : false;
	// console.log('premium ? -> ', premium);

	const [getTemplateById] = useCreateUuidPaymentMutation({
		fetchPolicy: 'no-cache',
		onCompleted(getTemplateData) {
			fetch('/api/checkout_sessions', {
				method: 'POST',
				body: JSON.stringify({ uuid: getTemplateData.createUuidPayment.uuid }),
			})
				.then((res) => res.json())
				.then((body) => router.push(body.url));
		},
	});

	const getPaymentLink = () => {
		const uuid = getTemplateById({ variables: { id: user.id } });
	};

	return (
		<>
			<AntHeader
				style={{
					backgroundColor: '#ffffff',
					position: 'sticky',
					top: 0,
					zIndex: 1,
				}}
				className="!px-4 !min-h-16 !max-h-20 shadow-md"
			>
				<div className="flex items-center justify-between h-full">
					<Space className="!px-2">
						<Link href={user ? '/dashboard' : '/'}>
							<Image
								src="/logo-typo.png"
								alt="inboxArtisan Logo"
								preview={false}
								className="!h-12"
							/>
						</Link>
						{/* {!isMobile ? <Title level={3}>InboxArtisan</Title> : null} */}
						<Divider
							type="vertical"
							style={{
								height: '1.5rem',
								borderInlineStart: '1px solid rgba(5, 5, 5, 0.08)',
							}}
						/>
					</Space>
					{isLayout ? (
						<Space>
							{!premium && (
								<Tooltip title="Get a premium account !">
									<Button
										// href="/subscribe"
										onClick={() => {
											getPaymentLink();
										}}
										type="primary"
										icon={<CrownFilled />}
										className="mr-4"
									>
										Upgrade to premium
									</Button>
								</Tooltip>
							)}
							{premium && (
								<Tooltip title="You have a premium account">
									<Flex
										gap="small"
										className="bg-gradient-to-br from-green-300 to-teal-600 text-white rounded-md py-1.5 px-4"
									>
										<CrownFilled />
										<Text className="!text-white !text-sm">Premium</Text>
									</Flex>
								</Tooltip>
							)}
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
									<Button href="/auth/login" size="large">
										Log in
									</Button>
									<Button href="/auth/register" type="primary" size="large">
										Sign up
									</Button>
								</>
							)}
							{user && (
								<>
									<Button href="/dashboard" type="primary" size="large">
										Dashboard
									</Button>
									<Button
										type="primary"
										size="large"
										danger
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
