import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import {
	useDeleteImageMutation,
	useImageByFolderIdLazyQuery,
	useImageByUserIdLazyQuery,
} from '@/types/graphql';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Image, Row } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { ImageType } from '@/types/library.type';
import LibraryModal from '@/components/LibraryModal/ImagesModal';
import { useRouter } from 'next/router';

const Library = () => {
	const [images, setImages] = useState<ImageType[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const [ImageForm] = Form.useForm();
	const values = Form.useWatch([], ImageForm);
	const router = useRouter();
	const slug = parseInt(router.query.slug as string, 10);

	const [getImageByUserId] = useImageByFolderIdLazyQuery({
		fetchPolicy: 'no-cache',
		variables: { id: slug },
		onCompleted(data) {
			setImages(data.imageByFolderId);
		},
	});

	const newImage = () => {
		ImageForm.setFieldValue('id', 'new');
		setIsOpen(true);
	};

	const [deleteImage] = useDeleteImageMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			getImageByUserId({});
		},
	});

	console.log(process.env.NEXT_PUBLIC_images);

	const onFinish = () => {
		getImageByUserId({});
		setIsOpen(false);
	};

	useEffect(() => {
		getImageByUserId({});
	}, []);

	return (
		<Col>
			<Row className="mb-4 justify-end">
				<Button type="primary" onClick={() => newImage()}>
					Add image
				</Button>
			</Row>
			<Row gutter={[16, 16]}>
				<LibraryModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					ImageForm={ImageForm}
					onFinish={onFinish}
				/>
				{images.map((el, index) => (
					<Col key={index} xs={24} md={12} lg={8} xl={6}>
						<Card
							title={el.name}
							cover={<Image alt="example" src={el.url} height={250} />}
							actions={[
								<EditOutlined
									key="edit"
									onClick={() => {
										ImageForm.setFieldsValue(el);
										ImageForm.setFieldValue('id', el.id);
										setIsOpen(true);
									}}
								/>,
								<DeleteOutlined
									key="ellipsis"
									onClick={() =>
										el?.id && deleteImage({ variables: { id: el?.id } })
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
