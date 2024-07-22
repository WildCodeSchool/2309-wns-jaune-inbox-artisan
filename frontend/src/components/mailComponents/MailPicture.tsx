import { ReactElement } from "react"
import {Divider, Image, Space} from "antd"
import { PictureType } from "../types"

const MailPicture = ({
    style,
    picture,
    width,
    height
}:
 {
    style: Object,
    picture : PictureType
    width: number,
    height: number
}) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Image style={style}  src={picture?.src} alt={picture?.alt} width={`${width}%`} height={`${height}%`} preview={false} />
        </div>
    )
}

export default MailPicture