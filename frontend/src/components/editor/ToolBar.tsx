import { useState } from "react"

import { Space, Button } from "antd"


const ToolBar = ({setIsModalOpen, onSave, printTemplate}) => {


    return (
        <Space >
            <Button onClick={() => {setIsModalOpen(true)}}>Setup</Button>
            <Button onClick={() => {onSave()}}>save</Button>
            <Button onClick={() => {printTemplate()}}>print</Button>
        </Space>
    )
}

export default ToolBar