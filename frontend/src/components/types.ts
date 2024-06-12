import { ReactElement, ReactNode } from 'react';

export type AuthLayoutProps = {
	children: ReactNode;
	title: string;
	description?: ReactNode;
	fullWidthImage?: boolean;
	imageSrc?: string;
};

export type GlobalLayoutProps = {
	children: ReactNode;
	title: string;
	description?: ReactNode;
	action?: ReactElement;
	hidden?:boolean
};
