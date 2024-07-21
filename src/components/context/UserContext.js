import { createContext, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import { getUser } from '../../lib/requestTypes';

const UserContext = createContext([{}, () => {}]);

/**
 * UserContext
 * 
 * If there's no user redirect
 */
function UserProvider({
	children
}) {
	const [fetchEnded, setFetchEnded] = useState(false);
	const [user, setUser] = useState(null);
	
	/**
	 * Get user
	 */
	async function fetchUser() {
		const response = await getUser();
		
		// Response finished but there's no user
		if(!response) {
			setFetchEnded(true);
			return;
		}
		
		const user = response.user;
		if(!user) {
			setFetchEnded(true);
			return;
		}
		
		setUser(user);
		setFetchEnded(true);
	}
	
	// Get user
	useEffect(() => {
		fetchUser();
	}, []);
	
	// Wait
	if(!fetchEnded) {
		return (
			<Spinner>
			</Spinner>
		);
	}
	
	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
}

export {
	UserContext,
	UserProvider
};
