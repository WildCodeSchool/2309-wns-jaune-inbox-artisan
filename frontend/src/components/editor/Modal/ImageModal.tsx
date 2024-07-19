import { useState, useEffect } from "react"
import { Button, Modal, Card, Col, Image } from "antd"
import {  EditOutlined } from '@ant-design/icons';
import { useImageByUserIdLazyQuery, ImageByUserIdQuery } from "../../../types/graphql"
import { useUser } from "@/Contexts/UserContext"

const ImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [images, setImages] = useState<{ __typename?: 'Image', id: number, name: string, url: string }[]>([])

  const { user } = useUser();


  const [getImageByUserId] = useImageByUserIdLazyQuery({
    fetchPolicy: 'no-cache',
    variables: { id: user.id },
    onCompleted(data: ImageByUserIdQuery) {
      console.log(data.imageByUserId)
      setImages(data.imageByUserId);
    },
  });

  useEffect(() => { getImageByUserId() }, [])

  return <>
    <Button onClick={() => { setIsModalOpen(true) }}>Select Images </Button>{console.log(images)}
    <Modal title="Select the image you want to use." open={isModalOpen} onCancel={() => { setIsModalOpen(false) }} onOk={() => setIsModalOpen(false)}>
      {images.map((el, index) => (<Col key={index} xs={24} md={12} lg={8} xl={6}>
        <Card
          title={el.name}
          cover={<Image alt="example" src={el.url} height={250} />}
          actions={[
            <EditOutlined
              key="use"
            />
          ]}
          bodyStyle={{ display: 'none' }}
          className="!border-gray-300"
        />
      </Col>))}
    </Modal>

  </>
}

export default ImageModal