import { Typography } from 'antd';
import { VariableType } from '../types';
import { CSSProperties, FC } from 'react';

const { Text } = Typography;

type MailTextpropsType = {
	text: string;
	style: CSSProperties;
	variables?: VariableType[];
};

const MailText: FC<MailTextpropsType> = ({ text, style, variables }) => {
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
		<Text
			style={{ ...style, whiteSpace: 'pre-wrap' }}
			className="block !w-[100%]"
		>
			{handleVariable()}
		</Text>
	);
};

export default MailText;
