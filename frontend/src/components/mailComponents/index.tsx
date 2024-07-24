import { useUser } from '@/Contexts/UserContext';
import {
	useVariablesByUserIdLazyQuery,
	VariablesByUserIdQuery,
} from '@/types/graphql';
import React, {
	lazy,
	Suspense,
	useState,
	useEffect,
	useRef,
	ReactNode,
	LazyExoticComponent,
	CSSProperties,
	FC,
} from 'react';
import { VariableType } from '../types';

type ComponentCacheType = {
	[key: string]: LazyExoticComponent<React.ComponentType<any>>;
};

const componentCache: ComponentCacheType = {};

const dynamicImport = (componentName: string) => {
	if (!componentCache[componentName]) {
		componentCache[componentName] = lazy(() => import(`./${componentName}`));
	}
	return componentCache[componentName];
};

type ComponentsPropsType = {
	name: string;
	keys: Object;
	style: CSSProperties;
};

const Components: FC<ComponentsPropsType> = ({ name, keys, style }) => {
	const ComponentToRender = dynamicImport(name);

	const [variables, setVariables] = useState<VariableType[]>();

	const { user } = useUser();

	const [getVariableByUserId, { data: dataAds }] =
		useVariablesByUserIdLazyQuery({
			fetchPolicy: 'no-cache',
			onCompleted(data) {
				setVariables(data.variablesByUserId);
			},
		});

	useEffect(() => {
		// console.log(user)
		getVariableByUserId({ variables: { id: user.id } });
	}, []);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ComponentToRender {...keys} style={style} variables={variables} />
		</Suspense>
	);
};

export default Components;
