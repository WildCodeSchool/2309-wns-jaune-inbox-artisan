import { List, Typography } from 'antd';
import React, { CSSProperties, FC } from 'react';
import { VariableType } from '../types';

type MailListPropsType = {
	style: CSSProperties;
	title: string;
	items: string[];
	variables: VariableType[];
};

const MailList: FC<MailListPropsType> = ({ style, items, variables }) => {
	const handleVariable = (text: string) => {
		let newText = `${text}`;
		variables?.forEach((variable) => {
			newText = newText.replaceAll(
				`[[${variable.label}]]`,
				variable?.value || ''
			);
		});
		return newText;
	};

	return (
		<List
			style={style}
			dataSource={items}
			renderItem={(item) => <List.Item>{handleVariable(item)}</List.Item>}
		></List>
	);
};

export default MailList;
