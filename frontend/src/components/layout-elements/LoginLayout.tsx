import { Col, Image, Row, Typography } from 'antd';
import { AuthLayoutProps } from '../types';
const {Title} = Typography

const LoginLayout = ({ children, description, fullWidthImage, imageSrc, title }: AuthLayoutProps) => {
  return (
  <Row className="h-[100vh]">
    <Col className='flex h-[100%] items-center justify-center' xs={24} lg={12}>
      <div className='w-[400px] m-auto'>
        <Image src="../../../public/img.png" preview={false} width={140} className="" />
        <Title level={2}>{title}</Title>
        {!!description && description}
        {children}
      </div>
    </Col>
    <Col xs={0} lg={12}>
      <Image preview={false} width={fullWidthImage ? '100%' : 480} height={"99.5vh"} className='' src={imageSrc || "https://picsum.photos/768/1080"} />
    </Col>
  </Row>)
}

export default LoginLayout;
