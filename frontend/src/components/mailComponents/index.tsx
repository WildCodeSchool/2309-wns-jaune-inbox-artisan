import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

const componentCache = {};

const dynamicImport = (componentName) => {
  if (!componentCache[componentName]) {
    componentCache[componentName] = lazy(() => import(`./${componentName}`));
  }
  return componentCache[componentName];
};

const Components = ({ name, keys, style }) => {
  const ComponentToRender = dynamicImport(name);
  console.log(style)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentToRender {...keys} style={style} />
    </Suspense>
  );
};

export default Components;
