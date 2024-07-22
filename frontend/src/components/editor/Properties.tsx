import { useEditor } from "@/Contexts/EditorContext";
import {
  Input,
  InputNumber,
  Col,
  Row,
  Divider,
  Collapse,
  Space,
  ColorPicker,
  Segmented,
  Flex,
  Button,
  Tooltip,

} from 'antd';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined, ColumnHeightOutlined, ColumnWidthOutlined, ItalicOutlined, RadiusSettingOutlined, UnderlineOutlined } from '@ant-design/icons';
import type { InputNumberProps, CollapseProps } from 'antd';
import { useState, useEffect } from "react";
import PropertyRender from "./PropertyRender"

const Properties = () => {

  const { state, dispatch, editedPostion } = useEditor();

  const editedComponnent = state.find(row => row.some((col) => col.isEdited))?.find(el => el.isEdited)
  const editedComponnentKeys = editedComponnent?.keys
  const editedComponnentStyle = editedComponnent?.style

  const maxWidth = state[editedPostion.rowId].length === 1 ? 24 : 24 - (state[editedPostion.rowId].length - 1) * 4
  const minWidth = state[editedPostion.rowId].length === 1 ? 24 : 4

  // console.log(editedComponnent)
  // console.log(editedComponnentKeys)

  const [typoBtnState, setTypoBtnState] = useState({ "bold": false, "italic": false, "underline": false });
  // const [typoBtnState, setTypoBtnState] = useState({"bold": false, "italic": false, "underline": false});

  const handleClick = (typoStyle: string) => {
    setTypoBtnState({ ...typoBtnState, [typoStyle]: !typoBtnState[typoStyle] });
    console.log("key", typoStyle);
    console.log("state",typoBtnState);
    dispatch({ type: "handleContainerProperty", position: editedPostion, data: { typoStyle }});
  }


  const handlePropertiesDisplay = () => {

    return (<> {editedComponnentKeys ? Object?.keys(editedComponnentKeys).map((key) => (<PropertyRender key={key} name={key} value={editedComponnentKeys[key]} />)) : <>No properties</>}</>)
  }

  const elementProperties = (element: any) => {

    const items: CollapseProps['items'] = [
      {
        key: "0",
        label: "Element properties",
        children: 
          <Row gutter={[16, 16]} wrap>{handlePropertiesDisplay()}</Row>
      },
      {
        key: '1',
        label: 'Sizing',
        children:
          <>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <InputNumber
                  addonBefore={<ColumnWidthOutlined />}
                  addonAfter="%"
                  size="small"
                  className=""
                  maxLength={3}
                  min={minWidth}
                  max={maxWidth}
                  disabled={minWidth === 24}
                  controls={false}
                  keyboard={true}
                  changeOnWheel
                  value={editedComponnent?.containerWidth}
                  onChange={(value) => { dispatch({ type: "handleContainerProperty", position: editedPostion, data: { containerWidth: value } }) }}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  addonBefore={<ColumnHeightOutlined />}
                  addonAfter="%"
                  size="small"
                  placeholder="%"
                  className=""
                  maxLength={3}
                  min={0}
                  max={100}
                  controls={false}
                  keyboard={true}
                  changeOnWheel
                  value={parseInt(editedComponnentStyle?.height,10)}
                  onChange={(value ) => dispatch({ type: "handleContainerProperty", position: editedPostion, data: { height: value }})}
                />
              </Col>

              <Col span={12}>
                <InputNumber
                  addonBefore={<RadiusSettingOutlined />}
                  addonAfter="%"
                  size="small"
                  placeholder="%"
                  className=""
                  maxLength={3}
                  min={0}
                  max={100}
                  controls={false}
                  keyboard={true}
                  changeOnWheel
                  value={parseInt(editedComponnentStyle?.borderRadius, 10) ?? 0}
                  onChange={(value ) => dispatch({ type: "handleContainerProperty", position: editedPostion, data: { borderRadius: value }})}
                />
              </Col>
            </Row>
          </>,
      },
      {
        key: '3',
        label: 'Typography',
        children:
          <>
            <Flex justify="center" align="center" vertical>
              <Flex justify="center" align="center" className="pb-2">
                <Space.Compact block className="pr-2">
                  <Button icon={<BoldOutlined />} type={editedComponnentStyle?.fontWeight ? "primary" : "default"} onClick={() => handleClick("bold")}/>
                  <Button icon={<ItalicOutlined />} type={editedComponnentStyle?.fontStyle ? "primary" : "default"} onClick={() => handleClick("italic")}/>
                  <Button icon={<UnderlineOutlined />} type={editedComponnentStyle?.textDecoration ? "primary" : "default"} onClick={() => handleClick("underline")}/>
                </Space.Compact>
                <Segmented
                value={editedComponnentStyle?.textAlign ?? "start"}
                onChange= {(value) => dispatch({ type: "handleContainerProperty", position: editedPostion, data: { textAlign: value }})}
                  options={[
                    { value: 'start', icon: <AlignLeftOutlined /> },
                    { value: 'center', icon: <AlignCenterOutlined /> },
                    { value: 'end', icon: <AlignRightOutlined /> },
                  ]}
                />
              </Flex>

              <Segmented
                defaultValue="20px"
                value={editedComponnentStyle?.fontSize ?? "20px"}
                onChange={(value) => dispatch({ type: "handleContainerProperty", position: editedPostion, data: { fontSize: value }})}
                options={[
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <div>S</div>
                      </div>
                    ),
                    value: '16px',
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <div>M</div>
                      </div>
                    ),
                    value: '20px',
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <div>L</div>
                      </div>
                    ),
                    value: '24px',
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <div>XL</div>
                      </div>
                    ),
                    value: '30px',
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <div>XXL</div>
                      </div>
                    ),
                    value: '38px',
                  },
                ]}
              />
            </Flex>
          </>,
      },
      {
        key: '2',
        label: 'Color',
        children:
          <>
            <Space direction="vertical">
              <ColorPicker
                defaultValue="#000000"
                value={editedComponnentStyle?.color ?? "#000000" }
                showText={(color) => <span>Texte : ({color.toHexString().toUpperCase()})</span>}
                onChange={(_, hex) => {dispatch({ type: "handleContainerProperty", position: editedPostion, data: { color: hex }})}}
                format="hex"
              />
              <ColorPicker
                defaultValue="#ffffff"
                value={editedComponnentStyle?.backgroundColor ?? "#ffffff" }
                onChange={(_, hex) => {dispatch({ type: "handleContainerProperty", position: editedPostion, data: { backgroundColor: hex }})}}
                format="hex"
                showText={(color) => <span>Arrière-plan : ({color.toHexString().toUpperCase()})</span>}
              />
            </Space>
          </>,
      },
    ];

    return (
      // <>
      //     {element.map((style) => {
      //         // <div id="element-width" className=""></div>
      //         // <div id="element-width" className=""></div>

      //         <Input placeholder="Basic usage" />;

      //     })}
      // </>
      <>
        <div className="">
          <Collapse items={items} defaultActiveKey={['0', '1', '2', '3']} />
        </div>
      </>
    )
  }

  return (
    <>
      <div>Properties</div>
      {editedComponnentKeys && Object.keys(editedComponnentKeys)?.map((key, index) => (<div key={index}>{key} : {typeof editedComponnentKeys[key] === "object" ? JSON.stringify(editedComponnentKeys[key]) : editedComponnentKeys[key]}</div>))}
      {/* {editedComponnentStyle && Object.keys(editedComponnentStyle)?.map((key, index) => (<div>{key} : {typeof editedComponnentStyle[key] === "object" ? JSON.stringify(editedComponnentKeys[key]) : editedComponnentStyle[key]}</div>))} */}
      {/* {`actual row: ${editedPostion.rowId}, actual col: ${editedPostion.colId}`} */}
      {elementProperties(state)}
      {/* {editedComponnent ? elementProperties(state) : "Sélectionnez un élément pour le modifier"} */}
    </>
  )
}

export default Properties