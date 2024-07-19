import { Carousel, Image, Typography } from "antd"

const {Title} = Typography

type PictureType = {
    src :string;
    alt :string;
}

const MailCarousel = ({
    style,
    contentStyle,
    pictures,
    title,
}: {
    style: Object,
    contentStyle: Object,
    pictures: PictureType[],
    title: string,
}) => {
    return (
        <Carousel style={style}>
            {title && <Title level={4} style={{textAlign: "center", marginBlockEnd: 0,}} className=" m-0 p-0 !text-center" >{title}</Title>}
            {pictures?.map((picture, i) => {return (
                <div key={i}>
                    <Image src={picture?.src} alt={picture?.alt}/>
                </div>
            )})}
        </Carousel>
    )
}

export default MailCarousel