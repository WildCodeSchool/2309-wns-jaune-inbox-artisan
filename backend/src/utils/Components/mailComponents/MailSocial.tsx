import React, { Flex } from 'antd';
import {
	FacebookFilled,
	TwitterSquareFilled,
	InstagramFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { FC } from 'react';

type MailSocialPropsType = {
	style: Object;
	facebookLink?: string;
	twitterLink?: string;
	instagramLink?: string;
};

const MailSocial: FC<MailSocialPropsType> = ({
	style,
	facebookLink,
	twitterLink,
	instagramLink,
}) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			{facebookLink && (
				<a href={facebookLink} style={style}>
					{/* <FacebookFilled style={{ fontSize: '24px', color: '#126dff' }} /> */}
					<img
						src="https://cdn-icons-png.flaticon.com/512/21/21155.png"
						alt="facebook-icon"
						width="24px"
						// style={{color: "red"}}
						style={{
							filter:
								'brightness(0) saturate(100%) invert(29%) sepia(95%) saturate(2736%) hue-rotate(210deg) brightness(101%) contrast(101%)',
						}}
					/>
				</a>
			)}
			{twitterLink && (
				<a href={twitterLink} style={style}>
					{/* <TwitterSquareFilled style={{ fontSize: '24px', color: '#2a9ef1' }} /> */}
					<img
						src="https://cdn-icons-png.flaticon.com/512/25/25347.png"
						alt="twitter-icon"
						width="24px"
						style={{
							filter:
								'brightness(0) saturate(100%) invert(62%) sepia(46%) saturate(5014%) hue-rotate(180deg) brightness(98%) contrast(94%);',
						}}
					/>
				</a>
			)}
			{instagramLink && (
				<a href={instagramLink} style={style}>
					{/* <InstagramFilled style={{ fontSize: '24px', color: '#f1168e' }} /> */}
					<img
						src="https://cdn-icons-png.flaticon.com/512/4770/4770440.png"
						alt="instagram-icon"
						width="24px"
						style={{
							filter:
								'brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(7485%) hue-rotate(314deg) brightness(95%) contrast(99%);',
						}}
					/>
				</a>
			)}
		</div>
	);
};

export default MailSocial;
