import { Col, Image, Row, Typography } from 'antd';
import { AuthLayoutProps } from '../types';
import Header from './Header/Header';
const { Title } = Typography;

const LoginLayout = ({
	children,
	description,
	fullWidthImage,
	imageSrc,
	title,
}: AuthLayoutProps) => {
	return (
		<div className="max-h-[100vh]">
			<Header isLayout={false} />
			<Row>
				<Col
					className="flex h-[100%] items-center justify-center"
					xs={24}
					lg={12}
				>
					<div className="min-w-[320px] w-[100%] m-auto">
						<Image
							src={'/logo.svg'}
							alt="InboxArtisan Logo"
							preview={false}
							width={140}
							height={140}
							className=""
						/>
						<Title level={2}>{title}</Title>
						{!!description && description}
						{children}
					</div>
				</Col>
				<Col xs={0} lg={12}>
					<Image
						alt="beatifull login image"
						preview={false}
						width={fullWidthImage ? '100%' : 480}
						height={'93vh'}
						src={imageSrc || 'https://picsum.photos/768/1080'}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default LoginLayout;
