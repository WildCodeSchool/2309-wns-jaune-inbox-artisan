import { List } from "antd"
import Typography from "antd/es/typography/Typography"
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
        dataSource={items}
        renderItem={(item) => (
            <List.Item>
                {item}
            </List.Item>
        )}></List>
    )
}

export default MailList