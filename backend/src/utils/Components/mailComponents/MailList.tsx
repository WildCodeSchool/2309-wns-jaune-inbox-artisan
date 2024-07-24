import { List, Typography } from "antd"
import { ReactNode } from "react"

const MailList = ({
    style,
    title,
    items,
}: {
    style: Object,
    title: string,
    items: ReactNode[], 
}) => {
    return (
        <List 
            style={style}
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    {item}
                </List.Item>
            )}
        >
        </List>
    )
}

export default MailList