import { useState } from 'react';

import { Space, Button, Typography } from 'antd';

const ToolBar = ({
	setIsModalOpen,
	onSave,
	printTemplate,
	templateTitle,
	onTitleChange,
}) => {
	const [editableStr, setEditableStr] = useState('This is an editable text.');

	return (
		<div>
			<Typography.Title
				editable={{ onChange: onTitleChange }}
				level={3}
				style={{ margin: 0 }}
			>
				{templateTitle}
			</Typography.Title>
			<Space>
				<Button
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					Setup
				</Button>
				<Button
					onClick={() => {
						onSave();
					}}
				>
					save
				</Button>
				<Button
					onClick={() => {
						printTemplate();
					}}
				>
					print
				</Button>
			</Space>
		</div>
	);
};

export default ToolBar;
