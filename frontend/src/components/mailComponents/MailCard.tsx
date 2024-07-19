import { Card } from "antd";
import { Children, ReactNode } from "react";

const MailCard = ({
    style,
    title,
    children,
}: {
    style: Object,
    title: string,
    children: ReactNode,
}) => {
    return (
        <Card title={title} style={style}>
            {children}
        </Card>
    )
}

export default MailCard