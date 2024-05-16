import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import {
	Folder,
	useDeleteFolderMutation,
	useDeleteImageMutation,
	useFolderByUserIdLazyQuery,
} from '@/types/graphql';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Image, Row } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { FolderType } from '@/types/library.type';
import Link from 'next/link';
import FolderModal from '@/components/LibraryModal/FolderModal';
import { useUser } from '@/Contexts/UserContext';

const Library = () => {
	const [folders, setFolders] = useState<FolderType[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const [FolderForm] = Form.useForm();
	const values = Form.useWatch([], FolderForm);

	const { user } = useUser();

	const newFolder = () => {
		FolderForm.setFieldValue('id', 'new');
		setIsOpen(true);
	};

	const [getFolderByUserId] = useFolderByUserIdLazyQuery({
		fetchPolicy: 'no-cache',
		variables: { id: user.id },
		onCompleted(data) {
			setFolders(data.folderByUserId ?? []);
		},
		onError(err) {
			console.error(err);
		},
	});

	const [deleteFolder] = useDeleteFolderMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			getFolderByUserId({});
		},
	});

	const onFinish = () => {
		getFolderByUserId({});
		setIsOpen(false);
	};

	useEffect(() => {
		getFolderByUserId({});
	}, []);

	return (
		<Col>
			<Row className="mb-4 justify-end">
				<Button type="primary" onClick={() => newFolder()}>
					Create Folder
				</Button>
			</Row>
			<Row gutter={[16, 16]}>
				<FolderModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					FolderForm={FolderForm}
					onFinish={onFinish}
				/>

				{folders.map((el, index) => (
					<Col key={index} xs={24} md={12} lg={8} xl={6}>
						<Card
							title={el.name}
							cover={
								<Link href={`library/${el.id}`}>
									<Image
										alt="example"
										preview={false}
										src={el?.images[0]?.url}
										height={250}
									/>
								</Link>
							}
							actions={[
								<EditOutlined
									key="edit"
									onClick={() => {
										FolderForm.setFieldsValue(el);
										FolderForm.setFieldValue('id', el.id);
										setIsOpen(true);
									}}
								/>,
								<DeleteOutlined
									key="ellipsis"
									onClick={() =>
										el?.id &&
										deleteFolder({ variables: { deleteFolderId: el?.id } })
									}
								/>,
							]}
							bodyStyle={{ display: 'none' }}
							className="!border-gray-300"
						/>
					</Col>
				))}
			</Row>
		</Col>
	);
};

Library.getLayout = function getLayout(page: ReactElement) {
	return (
		<GlobalLayout title="Library" description="This is a library.">
			{page}
		</GlobalLayout>
	);
};

export default Library;
