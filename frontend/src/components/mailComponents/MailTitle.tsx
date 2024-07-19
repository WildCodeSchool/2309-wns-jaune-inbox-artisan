import {Typography} from "antd"
import { TitleProps } from "antd/es/typography/Title"

const {Title} = Typography

const MailTitle = ( {level, text, style}: {level: TitleProps['level'], text: String}) => {
  // console.log(style)
  return <Title level={level} style={{marginBlockEnd: 0, ...style}} className="m-0 p-0" >{text}</Title>
}

export default MailTitle