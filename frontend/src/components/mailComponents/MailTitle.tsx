import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { VariableType } from '../types';

const { Title } = Typography;

type MailTitlePropsType = {
	level: TitleProps['level'];
	text: String;
	style: CSSProperties;
	variables: VariableType[];
};

const MailTitle: FC<MailTitlePropsType> = ({
	level,
	text,
	style,
	variables,
}) => {
	const [textWithVariable, setTextWithVariable] = useState('');

	const handleVariable = () => {
		let newText = `${text}`;
		variables?.forEach((variable) => {
			newText = newText.replaceAll(
				`[[${variable.label}]]`,
				variable?.value || ''
			);
		});
		setTextWithVariable(newText);
	};

	useEffect(() => {
		handleVariable();
	}, [variables]);

	// console.log(style)
	return (
		<Title
			level={level}
			style={{
				marginBlockEnd: 0,
				...style,
				height: style?.height ? `${style?.height}vh` : '100%',
			}}
			className="m-0 p-0"
		>
			{textWithVariable}
		</Title>
	);
};

export default MailTitle;
