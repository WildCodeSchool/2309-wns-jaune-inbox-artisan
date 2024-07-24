import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import View from './Components/View';
import buildMail from './utils';

const getMailHtml = (config: string, variables: any[]) => {
	const data: any[] = JSON.parse(config);

	const html = renderToStaticMarkup(
		React.createElement(View, { config: data, variables: variables })
	);

	const mail = buildMail(html);
	return mail;
};

export default getMailHtml;
