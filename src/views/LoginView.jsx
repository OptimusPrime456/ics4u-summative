import Header from "../components/Header";
import "./LoginView.css"
import Background from '../assets/background.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from "../context";

function LoginView() {
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { setFirstName, setSignedIn } = useStoreContext();

	function login(event) {
		event.preventDefault();
		if (password === "abcd1234") {
			setSignedIn(true);
			setFirstName('User');
			navigate('/home');
		} else {
			alert("Wrong password!");
		}
	}

	return (
		<div className='login-container'>
			<img src={Background} alt="Background" className="background" />
			<Header />
			<div className="island">
				<h2>Login</h2>
				<form onSubmit={(event) => { login(event) }}>
					<div className="field">
						<input type="text" required />
						<label>Email</label>
					</div>
					<div className="field">
						<input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
						<label>Password</label>
					</div>
					<button type="submit">Login</button>
				</form>
				<p>New to Netlicks? <a href="/register">Create account</a></p>
			</div>
		</div>

	)
}

export default LoginView