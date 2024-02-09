import { Col, Flex, Image, Row, Typography } from 'antd';
import { AuthLayoutProps } from '../types';
const {Title, Text} = Typography

const LoginLayout = ({ children, description, fullWidthImage, imageSrc, title, subtitle }: AuthLayoutProps) => {
  return (
  <Row className="h-[100vh]">
    <Col className='flex h-[100%] items-center justify-center' xs={24} lg={12}>
      <Flex vertical justify='flex-start' align='center' gap={50} className='h-[100%] w-[100%]'>
        <Title level={1} className='text-center text-5xl' >{title}</Title>
        <Text type='secondary' className='text-center'>{subtitle}</Text>
        {/* <Image src={"/logo.svg"} preview={false} width={140} height={140} className="" /> */}
        
        {!!description && description}
        {children}
      </Flex>

    </Col>
    <Col xs={0} lg={12}>
      <Image preview={false} width={fullWidthImage ? '100%' : 480} height={"99.5vh"} className='' src={imageSrc || "https://picsum.photos/768/1080"} />
    </Col>
  </Row>)
}

export default LoginLayout;
