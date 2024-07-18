import { Carousel, Image } from "antd"

const MailCarousel = ({
    style,
    contentStyle,
    pictures,
    title,
}: {
    style: Object,
    contentStyle: Object,
    pictures: Object[],
    title: string,
}) => {
    return (
        <Carousel>
            {pictures.map((picture, i) => {return (
                <div key={i}>
                    <Image src={picture.src} alt={picture.alt}/>
                </div>
            )})}
        </Carousel>
    )
}

export default MailCarousel