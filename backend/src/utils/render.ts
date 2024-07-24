import { renderToStaticMarkup } from 'react-dom/server';
import React  from 'react';
import View from "./Components/View"

const getMailHtml = (config : string, variables: any[]) => {
  const data: any[] = JSON.parse(config)

  const html = renderToStaticMarkup(React.createElement(View, {config:data, variables:variables}));
  console.log(html)
  return html
}

export default getMailHtml