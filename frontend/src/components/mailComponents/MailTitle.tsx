import {Typography} from "antd"
import { TitleProps } from "antd/es/typography/Title"
import { CSSProperties } from "react"

const {Title} = Typography

const MailTitle = ( {level, text, style}: {level: TitleProps['level'], text: String, style : CSSProperties}) => {
  // console.log(style)
  return <Title level={level} style={{marginBlockEnd: 0,...style, height: style?.height ? `${style?.height}vh` : "100%"}} className="m-0 p-0" >{text}</Title>
}

export default MailTitle