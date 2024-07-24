import { List, Typography } from 'antd';
import { CSSProperties, FC, ReactNode } from 'react';

type MailListPropsType = {
	style: CSSProperties;
	title: string;
	items: string[];
};

const MailList: FC<MailListPropsType> = ({ style, title, items }) => {
	return (
		<List
			style={style}
			dataSource={items}
			renderItem={(item) => <List.Item>{item}</List.Item>}
		></List>
	);
};

export default MailList;
