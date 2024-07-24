import { dynamicImport } from './Components'; // your dynamic import function

export const preloadAll = async () => {
  const components = ['Component1', 'Component2', 'Component3']; // list all components you might need
  await Promise.all(components.map(componentName => dynamicImport(componentName)));
};