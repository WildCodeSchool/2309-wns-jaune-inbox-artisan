import { useState } from "react"

import { Space, Button } from "antd"


const ToolBar = ({setIsModalOpen, onSave}) => {




    return (
        <Space direction="vertical">
            <Button onClick={() => {setIsModalOpen(true)}}>Setup</Button>
            <Button onClick={() => {onSave()}}>save</Button>
        </Space>
    )
}

export default ToolBar