import { Card } from 'antd';
import { CSSProperties, FC } from 'react';
import { VariableType } from '../types';

type MailCardPropsType = {
	style: CSSProperties;
	title: string;
	content: string;
	variables?: VariableType[];
};

const MailCard: FC<MailCardPropsType> = ({
	style,
	title,
	content,
	variables,
}) => {
	const handleVariable = () => {
		let newText = `${content}`;
		variables?.forEach((variable) => {
			newText = newText.replaceAll(
				`[[${variable.label}]]`,
				variable?.value || ''
			);
		});
		return newText;
	};

	return (
		<Card title={title} style={style}>
			<Card.Meta
				style={{ whiteSpace: 'pre-wrap' }}
				description={<>{handleVariable()}</>}
			/>
		</Card>
	);
};

export default MailCard;
