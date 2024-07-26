import { useState, useEffect } from 'react';
import { Button, Modal, Card, Col, Image, Row, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
	useImageByUserIdLazyQuery,
	ImageByUserIdQuery,
} from '../../../types/graphql';
import { useUser } from '@/Contexts/UserContext';
import { useEditor } from '@/Contexts/EditorContext';

const {Text} = Typography

type EditorImageType = { __typename?: 'Image'; id: number; name: string; url: string, folder: string }
type EditorSelectedImageType = { id: number; alt: string; src: string }

const ImageModal = ({type }: {type : string}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [images, setImages] = useState<EditorImageType[]
	>([]);
  const [selectedImages, setSelectedImages] = useState<
  EditorSelectedImageType[]
>([]);
const { dispatch, editedPostion } = useEditor()

	const { user } = useUser();

	const [getImageByUserId] = useImageByUserIdLazyQuery({
		fetchPolicy: 'no-cache',
		variables: { id: user.id },
		onCompleted(data: ImageByUserIdQuery) {
			console.log(data.imageByUserId);
			setImages(data.imageByUserId);
		},
	});

	useEffect(() => {
		getImageByUserId();
	}, []);

  const handleAddImage = (image : EditorImageType) => {
    if (type === "pictures") {
    const newData = [...selectedImages]
    if (!newData.find(el => el.id === image.id)) newData.push({src : image.url, alt: image.name, id: image.id})
    console.log(newData)
    setSelectedImages(newData)
    }
    else {
      setIsModalOpen(false)
      dispatch({
        type: "handleKeys",
        position: editedPostion,
        data: { [type]: {src : image.url, alt: image.name, id: image.id} }
      })
    }
  }

  const onFinish = () => {
    dispatch({
      type: "handleKeys",
      position: editedPostion,
      data: { [type]: selectedImages }
    })
    setIsModalOpen(false)
  }

	return (
		<>
			<Button
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				Select Images
			</Button>
			{console.log(images)}
			<Modal
				title="Select the image you want to use."
				open={isModalOpen}
				width="70%"
				onCancel={() => {
					setIsModalOpen(false);
				}}
				onOk={() => onFinish()}
			>
				<>
					<Row gutter={[8,8]}>
						{images.map((el, index) => (
							<Col key={index} xs={24} md={12} lg={12} xl={8}>
								<Card
									title={`${el.name}-${el.folder}`}
									cover={<Image alt="example" src={el.url} height={250} />}
									actions={[<EditOutlined key="use" onClick={() => {handleAddImage(el)}} />]}
									bodyStyle={{ display: 'none' }}
									className="!border-gray-300"
								/>
							</Col>
						))}
					</Row>
          <Text>actualy selected :</Text>
					<Row gutter={[8,8]}>
          {selectedImages.map((el, index) => (
							<Col key={index} xs={8} md={6} lg={4} xl={4}>
								<Image
                  src={el.src}
                  alt={el.alt}
                  preview={false}
                  width={50}
                  style={{border : "1px solid black"}}
								/>
							</Col>
						))}
					</Row>
				</>
			</Modal>
		</>
	);
};

export default ImageModal;
