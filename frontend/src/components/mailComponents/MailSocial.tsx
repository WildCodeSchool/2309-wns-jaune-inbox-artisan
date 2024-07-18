import { Image } from "antd"
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
        <div>
            {facebookLink && (
                <Link href={facebookLink}>
                    <Image preview={false} height={100} width={100} alt="facebook logo" src="/images/Facebook_logo.png" />
                </Link>
            )
            }
        </div>
    )
}

export default MailSocial