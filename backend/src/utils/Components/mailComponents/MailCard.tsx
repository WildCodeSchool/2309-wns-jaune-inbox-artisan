import React, { CSSProperties, FC } from 'react';
import { Card } from 'antd';
import { Children, ReactNode } from 'react';
import { VariableType } from '../types';

type MailCardPropsType = {
	style: CSSProperties;
	title: string;
	content: string;
	variables?: VariableType[];
};

const cardStyle = {
	border: '1px solid #f0f0f0',
	borderRadius: '2px',
	padding: '16px',
	backgroundColor: '#fff',
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
};

const MailCard: FC<MailCardPropsType> = ({ style, title, content }) => {
	return (
		<Card title={title} style={{ ...style, ...cardStyle }}>
			<Card.Meta
				style={{ whiteSpace: 'pre-wrap' }}
				description={<>{content}</>}
			/>
		</Card>
	);
};

export default MailCard;
