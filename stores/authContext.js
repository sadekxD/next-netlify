import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
	authReady: false,
});

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authReady, setAuthReady] = useState(null);

	useEffect(() => {
		netlifyIdentity.on("login", (user) => {
			setUser(user);
			netlifyIdentity.close();
			console.log("loggin event");
		});

		netlifyIdentity.on("logout", () => {
			setUser(null);
			console.log("logout event");
		});

		netlifyIdentity.on("init", (user) => {
			setUser(user);
			setAuthReady(true);
			console.log("init event");
		});

		// init netlify identity connection
		netlifyIdentity.init();

		return () => {
			netlifyIdentity.off("login");
			netlifyIdentity.off("logout");
		};
	}, []);

	const login = () => {
		netlifyIdentity.open();
	};

	const logout = () => {
		netlifyIdentity.logout();
	};

	const context = {
		user,
		login,
		logout,
		authReady,
	};
	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
