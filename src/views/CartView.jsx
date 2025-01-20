import { useStoreContext } from "../context"
import "./CartView.css"
import Header from "../components/Header"
import { firestore } from "../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { Map } from "immutable";

function CartView() {
  const { user, cart, setCart } = useStoreContext();

  const remove = (key) => {
    setCart((prevCart) => {
      const tempCart = prevCart.delete(key);
      localStorage.setItem(user.uid, JSON.stringify(tempCart.toJS()));
      return tempCart;
    });
  }

  const checkout = async () => {
    try {
      if (cart.size === 0) {
        alert("Cart is empty!");
        return;
      }
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const previousPurchases = userData.previousPurchases || [];
        const newPurchases = cart.toArray().map(([key, value]) => ({ id: key, title: value.title, url: value.url }));
        const updatedPurchases = [...previousPurchases, ...newPurchases];
        await updateDoc(userDocRef, {
          previousPurchases: updatedPurchases
        });
        const clearedCart = cart.clear();
        setCart(clearedCart);
        localStorage.setItem(user.uid, JSON.stringify(clearedCart.toJS()));
        alert("Thank you for your purchase!");
        location.reload();
      }
    } catch (error) {
      alert("Error during checkout!");
    }
  }
  return (
    <>
      <Header />
      <div className="cart-view">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-items">
          {
            cart.entrySeq().map(([key, value]) => {
              return (
                <div className="cart-item" key={key}>
                  <img src={`https://image.tmdb.org/t/p/w500${value.url}`} alt={value.title} />
                  <div className="cart-item-content">
                    <h1>{value.title}</h1>
                    <button onClick={() => remove(key)}>Remove</button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <button onClick={() => checkout()}>Checkout</button>
      </div>
    </>
  )
}

export default CartView;