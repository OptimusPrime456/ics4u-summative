import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../context';
import { Map } from 'immutable';

function Header() {
	const navigate = useNavigate();
	const { setEmail, setCart, firstName, setFirstName, setLastName, setPassword, setGenres, signedIn, setSignedIn } = useStoreContext();

	function logout() {
		setSignedIn(false);
		setEmail("");
		setFirstName("");
		setLastName("");
		setPassword("");
		setCart(Map());
		setGenres([]);
		setSignedIn(false);
		navigate("/login");
	}

	if (signedIn === false) {
		return (
			<div className="header">
				<div className="header-container">
					<div className="logo-container" onClick={() => navigate('/home')}>Netlicks</div>
					<div className="button-container">
						<ul className="button-list">
							<li className="button-list-item" onClick={() => navigate('/login')}>Login</li>
							<li className="button-list-item" onClick={() => navigate('/register')}>Register</li>
						</ul>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className="header">
				<div className="header-container">
					<div className="logo-container" onClick={() => navigate('/home')}>Netlicks</div>
					<div className="welcome-message">Welcome, {firstName}</div>
					<div className="button-container">
						<ul className="button-list">
						<li className="button-list-item" onClick={() => navigate('/movies')}>Movies</li>
							<li className="button-list-item" onClick={() => navigate('/cart')}>Cart</li>
							<li className="button-list-item" onClick={() => navigate('/settings')}>Settings</li>
							<li className="button-list-item" onClick={() => logout()}>Logout</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Header