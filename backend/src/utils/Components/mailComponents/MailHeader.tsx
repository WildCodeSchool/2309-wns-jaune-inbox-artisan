import { ReactElement } from "react"

const MailHeader = ({style, children}: {style: Object, children: React.ReactNode}) => {
    return (
        <div style={style}>{children}</div>
    )
}

export default MailHeader