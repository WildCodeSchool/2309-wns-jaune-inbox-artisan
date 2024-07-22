import { Carousel, Image, Row, Space, Typography } from 'antd';
import { PictureType } from '../types';

const { Title } = Typography;

const MailCarousel = ({
	style,
	contentStyle,
	pictures,
	title,
}: {
	style: Object;
	contentStyle: Object;
	pictures: PictureType[];
	title: string;
}) => {
	return (
		<div style={{...style, height: style?.height ? `${style?.height}vh` : "100%"}} 
        className="h-full">
			{title && (
				<Title
					level={4}
					style={{ textAlign: 'center', marginBlockEnd: 0 }}
					className=" m-0 p-0 !text-center w-full max-h-[10%]"
				>
					{title}
				</Title>
			)}
			<div
				className="mb-0 w-full "
				style={{ border: '3px solid yellow', height: '90%', overflow: 'hidden', }}
			>
				<Carousel autoplay autoplaySpeed={2000} dots={false} infinite style={{height: '100%'}}>
					{pictures?.map((picture, i) => (
						<div key={i} style={{ height: '100%', position: 'relative', overflow: 'visible' }}>
							<Image
								src={picture?.src}
								alt={picture?.alt}
								preview={false}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
								width="100%"
								height="100%"
							/>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default MailCarousel;
