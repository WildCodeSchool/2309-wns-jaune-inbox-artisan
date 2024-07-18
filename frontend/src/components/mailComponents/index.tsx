import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

const componentCache = {};

const dynamicImport = (componentName) => {
  if (!componentCache[componentName]) {
    componentCache[componentName] = lazy(() => import(`./${componentName}`));
  }
  return componentCache[componentName];
};

const Components = ({ name, keys }) => {
  const ComponentToRender = dynamicImport(name);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentToRender {...keys} />
    </Suspense>
  );
};

export default Components;
