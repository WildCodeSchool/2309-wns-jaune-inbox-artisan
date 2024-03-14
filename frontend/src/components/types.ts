import { ReactNode } from 'react';

export type AuthLayoutProps = {
	children: ReactNode;
	description?: ReactNode;
	fullWidthImage?: boolean;
	imageSrc?: string;
	title: string;
};

export type GlobalLayoutPropsType = {
	children: ReactNode;
};

export type SidebarPropsType = {
	setIsMobile: (value: boolean) => void;
	isMobile: boolean;
};
