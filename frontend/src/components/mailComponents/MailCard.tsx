import { Card } from 'antd';
import { CSSProperties, FC } from 'react';

type MailCardPropsType = {
	style: CSSProperties;
	title: string;
	content: string;
};

const MailCard: FC<MailCardPropsType> = ({ style, title, content }) => {
	return (
		<Card title={title} style={style}>
			{content}
		</Card>
	);
};

export default MailCard;
