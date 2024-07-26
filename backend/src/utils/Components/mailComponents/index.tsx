import React, { lazy, Suspense, CSSProperties } from 'react';

import MailCard from './MailCard';
import MailText from './MailText';
import MailTitle from './MailTitle';
import MailPicture from './MailPicture';

type ComponentCacheType = {
	[key: string]: any;
};

const componentCache: ComponentCacheType = {
	MailCard,
	MailPicture,
	MailText,
	MailTitle,
};

const dynamicImport = (componentName: any) => {
	if (!componentCache[componentName]) {
		componentCache[componentName] = lazy(() => import(`./${componentName}`));
	}
	return componentCache[componentName];
};

const Components = ({
	name,
	keys,
	style,
	variables,
}: {
	name: string;
	keys: Object;
	style: CSSProperties;
	variables: any[];
}) => {
	const ComponentToRender = dynamicImport(name);

	return <ComponentToRender {...keys} style={style} variables={variables} />;
};

export default Components;
