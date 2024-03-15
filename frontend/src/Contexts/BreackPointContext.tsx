import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { BreackPointContextType } from './types';

const defaultContext: BreackPointContextType = {
	isMobile: false,
	setIsMobile: () => {},
};

const BreackPointContext =
	createContext<BreackPointContextType>(defaultContext);

export const BreackPointProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isMobile, setIsMobile] = useState(defaultContext.isMobile);
	return (
		<BreackPointContext.Provider value={{ isMobile, setIsMobile }}>
			{children}
		</BreackPointContext.Provider>
	);
};

export const useBreackPoint = () => useContext(BreackPointContext);
