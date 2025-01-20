import Header from "../components/Header";
import "./LoginView.css"
import Background from '../assets/background.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from "../context";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

function LoginView() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { setUser } = useStoreContext();

	async function loginByEmail(event) {
		event.preventDefault();

		try {
			const user = (await signInWithEmailAndPassword(auth, email, password)).user;
			navigate("/movies");
			setUser(user);
		} catch (error) {
			console.log(error);
			alert("An error occurred while signing in!");
		}
	}

	async function loginByGoogle() {
		try {
			const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
			setUser(user);
			navigate("/movies");
		} catch (error) {
			alert("An error occurred while signing in!");
		}
	}

	return (
		<div className='login-container'>
			<img src={Background} alt="Background" className="background" />
			<Header />
			<div className="island">
				<h2>Login</h2>
				<form onSubmit={(event) => { loginByEmail(event) }}>
					<div className="field">
						<input type="text" value={email}  onChange={(event) => { setEmail(event.target.value) }} required />
						<label>Email</label>
					</div>
					<div className="field">
						<input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
						<label>Password</label>
					</div>
					<button type="submit">Login</button>
				</form>
				<p>New to Netlicks? <a href="/register">Create account</a></p>
				<button onClick={() => loginByGoogle()}>Login by Google</button>
			</div>
		</div>

	)
}

export default LoginView