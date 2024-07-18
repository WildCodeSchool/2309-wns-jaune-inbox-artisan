import { useState } from "react"

import { Space, Button } from "antd"


const ToolBar = ({setIsModalOpen}) => {




    return (
        <Space direction="vertical">
            <Button onClick={() => {setIsModalOpen(true)}}>Setup</Button>
        </Space>
    )
}

export default ToolBar