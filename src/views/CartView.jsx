import { useStoreContext } from "../context"
import "./CartView.css"
import Header from "../components/Header"

function CartView() {
  const { user, cart, setCart } = useStoreContext();

  const cartItems = [];

  cart.forEach((movie, id) => {
    cartItems.push(
      <div className="cart-item" key={id}>
        <h2>{movie.title}</h2>
        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster}`}/>
        <button onClick={() => setCart((prevCart) => prevCart.delete(id))}>Remove</button>
      </div>
    );
  })

  return (
    <div className="cart-view">
      <Header />
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartItems}
      </div>
    </div>
  )
}

export default CartView;