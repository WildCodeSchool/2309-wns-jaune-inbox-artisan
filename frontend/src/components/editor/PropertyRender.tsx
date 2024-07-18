import { Input, InputNumber, Typography, Col } from "antd"
import { useEditor } from "@/Contexts/EditorContext"

const inputString = ["src", "alt", "text"]
const inputNumber = ["level", "width", "height"]
// const button = ["strong","italic","underline"]

const inputNumberMax = { level: 6, width: 2600, heigt: 2600 }
const inputNumberMin = { level: 1, width: 50, heigt: 50 }

const { Text } = Typography

const ProperyRender = ({ name, value }) => {
  const { dispatch, editedPostion } = useEditor()

  return (
    <Col className="w-full gap-1 flex">
      {inputString.includes(name) && (
        <>
          <Text className="!w-1/5">{name} :</Text>
          <Input className="!w-4/5" 
          value={value} 
          onChange={(e) => { 
            dispatch({
              type: "handleKeys",
              position: editedPostion,
              data: { [name]: e.target.value } 
            })}} />
        </>)}
      {inputNumber.includes(name) && (
        <>
          <Text className="!w-1/5">{name} :</Text>
          <InputNumber 
            className="!w-4/5" 
            value={value} 
            max={inputNumberMax[name]} 
            min={inputNumberMin[name]} 
            onChange={(value) => { 
              dispatch({
                  type: "handleKeys",
                  position: editedPostion,
                  data: { [name]: value || 1 } 
                })}} />
        </>)}
    </Col>
  )
}
export default ProperyRender