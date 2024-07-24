import { Typography } from 'antd';
import { VariableType } from '../types';
import React,{ CSSProperties, useEffect, useState } from 'react';

const { Text } = Typography;

const MailText = ({
  text,
  style,
  variables
  }:
  {
    text: string,
    style: CSSProperties,
    variables: VariableType[],
}) => {
  const [textWithVariable, setTextWithVariable] = useState("")

  const handleVariable = () => {
    let newText =`${text}`
    variables?.forEach((variable) => {
      newText = newText.replaceAll(`[[${variable.label}]]`, variable?.value || '')
    })
    setTextWithVariable(newText)
  }


useEffect(() => {
  console.log(variables)
  handleVariable()
},[variables])

  return (
    // <Text underline strong italic >{text}</Text>
      <Text style={style} className="block !w-[100%]">{textWithVariable}</Text>
  )
}

export default MailText