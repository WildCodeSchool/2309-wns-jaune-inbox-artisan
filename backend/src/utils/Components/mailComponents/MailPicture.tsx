import React, { CSSProperties, FC, ReactElement } from 'react';
import { Divider, Image, Space } from 'antd';
import { PictureType } from '../types';

type MailPicturePropsType = {
	style: CSSProperties;
	picture: PictureType;
	width: number;
	height: number;
};

const MailPicture: FC<MailPicturePropsType> = ({
	style,
	picture,
	width,
	height,
}) => {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<Image
				style={style}
				src={picture?.src}
				alt={picture?.alt}
				width={`${width}%`}
				height={`${height}%`}
				preview={false}
			/>
		</div>
	);
};

export default MailPicture;
