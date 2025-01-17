import { createContext, useState, useContext, useEffect } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [cart, setCart] = useState(Map());
	const [genres, setGenres] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [previousPurchases, setPreviousPurchases] = useState(null);

	return (
		<StoreContext.Provider value={{ cart, setCart, genres, setGenres, user, setUser, loading, setLoading, previousPurchases, setPreviousPurchases }}>
			{children}
		</StoreContext.Provider>
	);
}

export const useStoreContext = () => {
	return useContext(StoreContext);
}