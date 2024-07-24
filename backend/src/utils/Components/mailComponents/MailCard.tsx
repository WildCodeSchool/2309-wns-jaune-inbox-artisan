import React from 'react'
import { Card } from "antd";
import { Children, ReactNode } from "react";

const MailCard = ({
    style,
    title,
    content,
}: {
    style: Object,
    title: string,
    content: string,
}) => {
    return (
        <Card title={title} style={style} >{content}</Card>
    )
}

export default MailCard