import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [cart, setCart] = useState(Map());
	const [genres, setGenres] = useState([]);
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState(null);

	return (
		<StoreContext.Provider value={{ email, setEmail, cart, setCart, firstName, setFirstName, lastName, setLastName, password, setPassword, genres, setGenres, signedIn, setSignedIn, user, setUser }}>
			{children}
		</StoreContext.Provider>
	);
}

export const useStoreContext = () => {
	return useContext(StoreContext);
}