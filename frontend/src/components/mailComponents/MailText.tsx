import { Typography } from 'antd';

const { Text } = Typography;

const MailText = ({
  text,
  // style,
  strong,
  italic,
  underline,
  }:
  {
    text: string,
    // style: Object,
    strong: boolean,
    italic: boolean,
    underline: boolean,
}) => {
  return (
    // <Text underline strong italic >{text}</Text>
    <>
      <Text>{text}</Text>
    </>
  )
}

export default MailText