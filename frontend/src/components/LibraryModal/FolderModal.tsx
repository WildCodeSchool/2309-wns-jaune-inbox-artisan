import { FC } from 'react';
import { FolderModalPropsType } from './types';
import { Form, Input, Modal } from 'antd';
import { Folder, CreateFolderInput } from '../../types/graphql';
import {
	useInsertFolderMutation,
	useUpdateFolderMutation,
} from '../../types/graphql';
import { useUser } from '@/Contexts/UserContext';
const FolderModal: FC<FolderModalPropsType> = ({
	isOpen,
	setIsOpen,
	FolderForm,
	onFinish,
}) => {
	const [UpdateFolder] = useUpdateFolderMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			onFinish();
		},
	});

	const [InsertFolder] = useInsertFolderMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			onFinish();
		},
	});

	const { user } = useUser();

	return (
		<Modal
			open={isOpen}
			title="Update Picture"
			onOk={() => {
				const insertValue = { ...FolderForm.getFieldsValue(), userId: user.id };
				delete insertValue.id;
				FolderForm.getFieldValue('id') === 'new'
					? InsertFolder({
							variables: {
								folder: insertValue,
							},
					  })
					: UpdateFolder({
							variables: {
								folder: { ...FolderForm.getFieldsValue() },
							},
					  });
			}}
			onCancel={() => {
				FolderForm.resetFields();
				setIsOpen(false);
			}}
		>
			<Form form={FolderForm} layout="vertical">
				<Form.Item label="Id :" key="id" name="id">
					<Input disabled />
				</Form.Item>
				<Form.Item label="Name :" key="name" name="name">
					<Input placeholder="Name :" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FolderModal;
