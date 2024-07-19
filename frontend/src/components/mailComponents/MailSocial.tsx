import { Flex } from "antd"
import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from '@ant-design/icons';
import Link from "next/link"

const MailSocial = ({
    style,
    facebookLink,
    twitterLink,
    instagramLink,
}: {
    style: Object,
    facebookLink?: string,
    twitterLink?: string
    instagramLink?: string,
}) => {
    return (
        // <div>
        <Flex justify={"space-around"}>
            {facebookLink && (
                <Link href={facebookLink} style={style}>
                    <FacebookFilled style={{ fontSize: '24px', color: '#126dff' }}/>
                </Link>
            )}
            {twitterLink && (
                <Link href={twitterLink} style={style}>
                    <TwitterSquareFilled style={{ fontSize: '24px', color: '#2a9ef1' }}/>
                </Link>
            )}
            {instagramLink && (
                <Link href={instagramLink} style={style}>
                    <InstagramFilled style={{ fontSize: '24px', color: '#f1168e' }}/>
                </Link>
            )}
        </Flex>
        // </div>
    )
}

export default MailSocial