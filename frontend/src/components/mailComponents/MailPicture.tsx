import { ReactElement } from "react"
import {Image} from "antd"

const MailPicture = ({
    style,
    src,
    alt,
    width,
    height
}:
 {
    style: Object,
    src: string,
    alt: string,
    width: number,
    height: number
}) => {
    return (
        <Image style={style} src={src} alt={alt} width={width} height={height}/>
    )
}

export default MailPicture