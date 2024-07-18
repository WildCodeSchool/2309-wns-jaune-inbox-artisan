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

    const {state, dispatch, editedPostion} = useEditor();

    const editedComponnent = state.find(row => row.some((col) => col.isEdited))?.find(el => el.isEdited)
    const editedComponnentKeys = editedComponnent?.keys

    const maxWidth = state[editedPostion.rowId].length === 1 ? 24 : 24 -(state[editedPostion.rowId].length - 1) *4 
    const minWidth = state[editedPostion.rowId].length === 1 ? 24 : 4 

    // console.log(editedComponnent)
    // console.log(editedComponnentKeys)
    console.log("edited:",state.find(row => row.some((col) => col.isEdited))?.find(el => el.isEdited))

    const [typoBtnState, setTypoBtnState] = useState({"bold": false, "italic": false, "underline": false});
    // const [typoBtnState, setTypoBtnState] = useState({"bold": false, "italic": false, "underline": false});

    const handleClick = (key :string) => {
        setTypoBtnState({...typoBtnState, [key]: !typoBtnState[key]});
        // console.log(editedComponnent);
    }


    const handlePropertiesDisplay= () => {

        return (<> {editedComponnentKeys ? Object?.keys(editedComponnentKeys).map((key) => (<PropertyRender key={key} name={key} value={editedComponnentKeys[key]} />)) : <>No properties</>}</>)
    }

    const elementProperties = (element :any) => {
        // console.log("state from Properties", state)

        const items: CollapseProps['items'] = [
            {key:"0", label: "Element properties", children : <Row gutter={[16,16]} wrap>{handlePropertiesDisplay()}</Row>},
            {
                key: '1',
                label: 'Dimensions',
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
                                onChange={(value) => { dispatch({type : "handleContainerProperty",position : editedPostion , data : {containerWidth : value}})}}
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
                            />
                        </Col>
                    </Row>
                </>,
            },
            {
                key: '3',
                label: 'Typographie',
                children: 
                    <>
                        <Flex justify="center" align="center" vertical>
                            <Flex justify="center" align="center" className="pb-2">
                                <Space.Compact block className="pr-2">
                                    <Button icon={<BoldOutlined />} type={typoBtnState.bold ? "primary" : "default"} onClick={() => handleClick("bold")}></Button>
                                    <Button icon={<ItalicOutlined />} type={typoBtnState.italic ? "primary" : "default"} onClick={() => handleClick("italic")}></Button>
                                    <Button icon={<UnderlineOutlined />} type={typoBtnState.underline ? "primary" : "default"} onClick={() => handleClick("underline")}></Button>
                                </Space.Compact>
                                <Segmented
                                    options={[
                                        { value: 'textLeft', icon: <AlignLeftOutlined /> },
                                        { value: 'textCenter', icon: <AlignCenterOutlined /> },
                                        { value: 'textRight', icon: <AlignRightOutlined /> },
                                    ]}
                                />
                            </Flex>

                            <Segmented
                                options={[
                                    {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <div>S</div>
                                        </div>
                                    ),
                                    value: 's',
                                    },
                                    {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                          <div>M</div>
                                        </div>
                                    ),
                                    value: 'm',
                                    },
                                    {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                          <div>L</div>
                                        </div>
                                    ),
                                    value: 'l',
                                    },
                                    {
                                        label: (
                                        <div style={{ padding: 4 }}>
                                           <div>XL</div>
                                        </div>
                                    ),
                                    value: 'xl',
                                    },
                                    {
                                        label: (
                                            <div style={{ padding: 4 }}>
                                            <div>XXL</div>
                                        </div>
                                    ),
                                    value: 'xxl',
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
                                showText={(color) => <span>Texte : ({color.toHexString().toUpperCase()})</span>}
                            />
                            <ColorPicker
                                defaultValue="#ffffff"
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
                    <Collapse items={items} defaultActiveKey={['1']} />
                </div>
            </>
        )
    }

    return (
        <>
            <div>Properties</div>
            {editedComponnentKeys && Object.keys(editedComponnentKeys)?.map((key, index) => (<div>{key} : {typeof editedComponnentKeys[key] ==="object" ? JSON.stringify(editedComponnentKeys[key]) : editedComponnent[key] }</div>))}
            {`actual row: ${editedPostion.rowId}, actual col: ${editedPostion.colId}`}
            {elementProperties(state)}
            {/* {editedComponnent ? elementProperties(state) : "Sélectionnez un élément pour le modifier"} */}
        </>
    )
}

export default Properties