import { Input, InputNumber, Typography, Col } from "antd"
import { useEditor } from "@/Contexts/EditorContext"

import ImageModal from "@/components/editor/Modal/ImageModal"

const inputString = ["src", "alt", "text", "title", "item", "facebookLink", "twitterLink", "instagramLink"]
const inputNumber = ["level", "width", "height"]
const libraryPicker = ["pictures", "picture"]
// const button = ["strong","italic","underline"]

type ParameterType = {
  [key : string] : number
}

const inputNumberMax : ParameterType = { level: 5, width: 2600, heigt: 2600 }
const inputNumberMin : ParameterType = { level: 1, width: 50, heigt: 50 }

const { Text } = Typography

type PropertyRenderPropsType = {
  name : string
  value : any
}

const ProperyRender  = ({ name, value }:PropertyRenderPropsType) => {
  const { dispatch, editedPostion } = useEditor()

  // console.log(name)

  return (
    <Col className="w-full gap-1 flex">
      {inputString.includes(name) && (
        <>
          <Text className="!w-2/6">{name} :</Text>
          <Input className="!w-4/6"
            value={value}
            onChange={(e) => {
              dispatch({
                type: "handleKeys",
                position: editedPostion,
                data: { [name]: e.target.value }
              })
            }} />
        </>)}
      {inputNumber.includes(name) && (
        <>
          <Text className="!w-2/6">{name} :</Text>
          <InputNumber
            className="!w-4/6"
            value={value}
            max={inputNumberMax[name]}
            min={inputNumberMin[name]}
            onChange={(value) => {
              dispatch({
                type: "handleKeys",
                position: editedPostion,
                data: { [name]: value || 1 }
              })
            }} />
        </>)}
        {libraryPicker.includes(name) && (
        <>
          <Text className="!w-2/6">{name} :</Text>
            <ImageModal />
        </>)}
    </Col>
  )
}
export default ProperyRender