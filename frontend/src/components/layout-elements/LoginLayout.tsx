import { Col, Flex, Image, Row, Typography } from 'antd';
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
		<>
			<Header isLayout={false} />
			<Row className="max-h-[100vh]">
				<Col
					className="flex h-[100%] items-center justify-center"
					xs={24}
					lg={12}
				>
					<div className="min-w-[320px] w-[100%] m-auto flex flex-col items-center">
						<Image
							src={'/logo.svg'}
							preview={false}
							width={140}
							height={140}
							className=""
							alt="logo"
						/>
						<Title level={2}>{title}</Title>
						{!!description && description}
						{children}
					</div>
				</Col>
				<Col xs={0} lg={12}>
					<Image
						preview={false}
						width={fullWidthImage ? '100%' : 480}
						height="93vh"
						className=""
						src={imageSrc || 'https://picsum.photos/768/1080'}
						alt="background"
					/>
				</Col>
			</Row>
		</>
	);
};

export default LoginLayout;
