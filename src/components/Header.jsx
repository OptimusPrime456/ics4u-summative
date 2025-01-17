import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../context';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Header() {
	const navigate = useNavigate();
	const { user, setUser } = useStoreContext();

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
		} catch {
			alert(error);
		}
	}

	if (!user) {
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
					<div className="welcome-message">Welcome, {user.displayName}</div>
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