import { Typography } from 'antd';
import { VariableType } from '../types';
import React, { CSSProperties, FC, useEffect, useState } from 'react';

const { Text } = Typography;

type MailTextpropsType = {
	text: string;
	style: CSSProperties;
	variables?: VariableType[];
};

const MailText: FC<MailTextpropsType> = ({ text, style, variables }) => {
	const [textWithVariable, setTextWithVariable] = useState('');

	const handleVariable = () => {
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
		// <Text underline strong italic >{text}</Text>
		<Text style={style} className="block !w-[100%]">
			{handleVariable()}
		</Text>
	);
};

export default MailText;
