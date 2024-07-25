import { Dispatch } from 'react';

export type BreackPointContextType = {
	isMobile: boolean;
	setIsMobile: (value: boolean) => void;
};

export type UserContextType = {
	user: any;
	setUser: (value: any) => void;
	verifyUser: (callback: () => void) => void;
	logout: () => void;
};

export type EditorContextType = {
	editedPostion: EditedPositionType;
	handlePosition: (rowId: number, colId: number) => void;
	state: any[][];
	dispatch: Dispatch<any>;
};

export type EditedPositionType = {
	colId: number;
	rowId: number;
};
