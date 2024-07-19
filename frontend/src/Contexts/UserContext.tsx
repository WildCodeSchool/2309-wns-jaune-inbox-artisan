import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { BreackPointContextType, UserContextType } from './types';
import { useRouter } from 'next/router';

const defaultContext: UserContextType = {
	user: false,
	setUser: () => {},
	verifyUser: () => {},
	logout: () => {}
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState(defaultContext.user);

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			const storedUser = sessionStorage.getItem('user');
			if (storedUser) {
				const ParsedUser = JSON.parse(storedUser);
				if (new Date(ParsedUser.expirationDate) > new Date()) {
					setUser({
						id: parseInt(ParsedUser.id, 10),
						username: ParsedUser.username,
					});
				} else {
					sessionStorage.removeItem('user');
					router.push('/auth/login');
				}
			}
		} else {
			if (
				['/auth/login', '/', '/auth/register'].includes(router.pathname) &&
				user
			)
				router.push('/dashboard');
		}
	}, []);

	const verifyUser = (callBack: () => void) => {
		if (!user) {
			const storedUser = sessionStorage.getItem('user');
			if (storedUser) {
				const ParsedUser = JSON.parse(storedUser);
				if (new Date(ParsedUser.expirationDate) > new Date()) {
					setUser({
						id: parseInt(ParsedUser.id, 10),
						username: ParsedUser.username,
					});
					callBack();
				} else {
					sessionStorage.removeItem('user');
					router.push('/auth/login');
				}
			}
		} else {
			if (
				['/auth/login', '/', '/auth/register'].includes(router.pathname) &&
				user
			)
				router.push('/dashboard');
			else callBack();
		}
	};

	const logout = () => {
		setUser(null)
		sessionStorage.removeItem("user")
		router.push('/');
	}
	return (
		<UserContext.Provider value={{ user, setUser, verifyUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
