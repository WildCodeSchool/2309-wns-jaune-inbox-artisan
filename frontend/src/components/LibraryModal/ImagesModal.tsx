import { FC, useState } from 'react';
import { FileType, ImageModalPropsType } from './types';
import {
	Form,
	Input,
	Modal,
	Upload,
	UploadFile,
	UploadProps,
	message,
} from 'antd';
import {
	useInsertImageMutation,
	useUpdateImageMutation,
} from '../../types/graphql';
import { useRouter } from 'next/router';
import { useUser } from '@/Contexts/UserContext';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';

const getBase64 = (file: FileType, callback?: () => void): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = (error) => reject(error);
	});

const LibraryModal: FC<ImageModalPropsType> = ({
	isOpen,
	setIsOpen,
	ImageForm,
	onFinish,
}) => {
	const [UpdateImage] = useUpdateImageMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			onFinish();
		},
	});

	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const beforeUpload = async (file: FileType) => {
		const newFile: UploadFile = {
			name: file.name,
			originFileObj: file,
			status: 'done',
			uid: file.uid,
			url: await getBase64(file),
		};
		setImageUrl(newFile.url);
		setLoading(false);
		return true;
	};

	const upload = async (file: UploadFile) => {
		try {
			const data = new FormData();
			data.append('file', file.originFileObj!);
			const response = await fetch('http://localhost:8000/upload', {
				method: 'POST',
				body: data,
			});

			if (!response.ok) {
				throw new Error('Failed to upload file');
			}

			const result = await response.json();
			console.log(result); // Log the server response

			return `http://localhost:8000${result.filename}`;
		} catch (error) {
			console.error('File upload error:', error);
			message.error('File upload failed');
			return false; // Returning false to prevent the file from being uploaded
		}
	};

	const { user } = useUser();

	const router = useRouter();
	const slug = parseInt(router.query.slug as string, 10);

	const [InsertImage] = useInsertImageMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			onFinish();
		},
	});

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	console.log(ImageForm.getFieldsValue());

	return (
		<Modal
			open={isOpen}
			title="Update Picture"
			onOk={async () => {
				const orginalValue = ImageForm.getFieldsValue();
				const insertData = {
					...orginalValue,
					url: await upload(orginalValue.url.file),
					userId: user.id,
					folderId: slug,
				};

				if (ImageForm.getFieldValue('id') === 'new') {
					delete insertData.id;

					InsertImage({
						variables: {
							image: insertData,
						},
					});
				} else
					UpdateImage({
						variables: {
							image: insertData,
						},
					});
			}}
			onCancel={() => {
				ImageForm.resetFields();
				setIsOpen(false);
			}}
		>
			<Form form={ImageForm} layout="vertical">
				<Form.Item label="Id :" key="id" name="id">
					<Input disabled />
				</Form.Item>
				<Form.Item label="Name :" key="name" name="name">
					<Input placeholder="Name :" />
				</Form.Item>
				<Form.Item label="Url :" key="url" name="url">
					<Upload
						name="avatar"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						beforeUpload={beforeUpload}
					>
						{imageUrl ? (
							<Image src={imageUrl} width={100} height={100} alt="avatar" />
						) : (
							uploadButton
						)}
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LibraryModal;
