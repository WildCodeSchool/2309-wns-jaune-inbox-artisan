import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import React, { CSSProperties, FC } from 'react';
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

	const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<HeadingTag
			style={{
				marginBlockEnd: 0,
				...style,
				height: style?.height ? `${style?.height}vh` : '100%',
				margin: 0,
				padding: 0,
			}}
		>
			{handleVariable()}
		</HeadingTag>
	);
};

export default MailTitle;
