import { createContext, useState, useContext, useEffect } from "react";
import { Map } from 'immutable';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [cart, setCart] = useState(Map());
	const [genres, setGenres] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [previousPurchases, setPreviousPurchases] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user);
				const sessionCart = localStorage.getItem(user.uid);
				if (sessionCart) {
					setCart(Map(JSON.parse(sessionCart)));
				}
			}
			setLoading(false);
		});
	}, [])

	if (loading) {
		return <h1>Loading...</h1>
	}

	const updateCart = (newCart) => {
		const updatedCart = typeof newCart === 'function' ? newCart(cart) : newCart;
		const immutableCart = Map.isMap(updatedCart) ? updatedCart : Map(updatedCart);
		setCart(immutableCart);
		if (user) {
			localStorage.setItem(user.uid, JSON.stringify(Array.from(immutableCart.entries())));
		}
	};

	return (
		<StoreContext.Provider value={{ cart, setCart: updateCart, genres, setGenres, user, setUser, loading, setLoading, previousPurchases, setPreviousPurchases }}>
			{children}
		</StoreContext.Provider>
	);
}

export const useStoreContext = () => {
	return useContext(StoreContext);
}