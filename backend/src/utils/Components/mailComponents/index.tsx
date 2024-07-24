import React, { lazy, Suspense, CSSProperties,  } from 'react';
import { VariableType } from '../types';

type ComponentCacheType = {
  [key : string] : any
}

const componentCache: ComponentCacheType  = {};

const dynamicImport = async (componentName: string) => {
  if (!componentCache[componentName]) {
    componentCache[componentName] = (await import(`./${componentName}`)).default;
  }
  return componentCache[componentName];
};

const Components = ({ name, keys, style, variables }: {name : string, keys:Object, style : CSSProperties, variables: any[] })  => {
  const ComponentToRender = lazy(() => dynamicImport(name));

  return (
      <ComponentToRender {...keys} style={style} variables={variables} />
  );
};

export default Components;
