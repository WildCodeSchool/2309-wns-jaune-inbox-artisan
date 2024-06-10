export type BreackPointContextType = {
	isMobile: boolean;
	setIsMobile: (value: boolean) => void;
};

export type UserContextType = {
	user: any;
	setUser: (value: any) => void;
	verifyUser: (callback: () => void) => void;
};
