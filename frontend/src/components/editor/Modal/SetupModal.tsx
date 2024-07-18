import { useState, useEffect } from "react";
import {Modal, Form, Row , Col, InputNumber, Button, Alert} from "antd"

import {useEditor} from "../../../Contexts/EditorContext"

const SetupModal = ({isOpen, closeModal}) => { 
const {dispatch} = useEditor()

  const [grid, setGrid] = useState([[{}],[{}],[{}]]);

  const [SetupForm]  = Form.useForm()
  const values = Form.useWatch([], SetupForm);

  useEffect(() => {
    const layout = [values?.row1, values?.row2, values?.row3].filter(val => val !== undefined);

    const newGrid = layout.map(num => Array(num).fill({}));
    setGrid(newGrid);
  }, [values]);

  useEffect(() => { 
    SetupForm.setFieldsValue({row1 : 1, row2 :1 , row3 : 1})
  },[])

  const onFinish = () => {
    dispatch({type : "setup", data : grid})
    closeModal()
  }

  const onCancel = () => {
    SetupForm.setFieldsValue({row1 : 1, row2 :1 , row3 : 1})
    closeModal()
  }

  return(
  <Modal open={isOpen} width="500" title="Basic Modal" onOk={() => {onFinish()}} onCancel={() => {onCancel()}} >
    <Alert type="warning" message ="Only do it at initialization of template or you will lose data" />
    <Row gutter={16}>
      <Col className="w-1/2">
    <Form style={{ width: '100%' }} layout="vertical" wrapperCol={{ span: 14 }}  labelWrap className="flex flex-col wrap" form={SetupForm}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Ligne 1"
              name="row1"
              rules={[{ required: true, message: 'Veuillez entrer le nombre de colonnes pour la ligne 1!' }]}
            >
              <InputNumber min={1} max={3} defaultValue={1}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Ligne 2"
              name="row2"
              rules={[{ required: true, message: 'Veuillez entrer le nombre de colonnes pour la ligne 2!' }]}
            >
              <InputNumber min={1} max={3} defaultValue={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Ligne 3"
              name="row3"
              rules={[{ required: true, message: 'Veuillez entrer le nombre de colonnes pour la ligne 3!' }]}
            >
              <InputNumber min={1} max={3} defaultValue={1}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      </Col>
      <Col className="w-1/2">
      <>Display</>
      <div className="w-1/2 border-solid border">
      {grid.map((row : any[], rowIndex : number) => 
        (<Row  key={rowIndex}>{row?.map((col :any, colIndex: number) => 
          (<Col span={24 / row.length } className="border border-solid" key={colIndex} >Col {`${rowIndex}-${colIndex}`}</Col>))}
        </Row>)
        )
      }
      </div>
      </Col>
      </Row>
  </Modal>)
}

export default SetupModal