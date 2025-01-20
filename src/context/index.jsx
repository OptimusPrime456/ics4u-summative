import { createContext, useState, useContext, useEffect } from "react";
import { Map, set } from 'immutable';
import { auth, firestore } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState(Map());
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(true);
	const [previousPurchases, setPreviousPurchases] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
				const sessionCart = localStorage.getItem(user.uid);
				if (sessionCart) {
					setCart(Map(JSON.parse(sessionCart)));
				}

				const docRef = doc(firestore, "users", user.uid);
				try {
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const fetchedGenres = docSnap.data().selectedGenres;
						setGenres(fetchedGenres);
						const fetchedPurchases = docSnap.data().previousPurchases;
						setPreviousPurchases(fetchedPurchases);
					} else {
						setGenres([]);
						setPreviousPurchases([]);
					}
				} catch (error) {
					console.log("Error getting document:", error);
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