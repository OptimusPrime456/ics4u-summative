import './RegisterView.css'
import Background from '../assets/background.png'
import Header from '../components/Header'
import { useStoreContext } from '../context/index.jsx'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/index.js'

function RegisterView() {
    const { setFirstName, setLastName, setEmail, setPassword, setSignedIn, setGenres } = useStoreContext();
    const navigate = useNavigate();
    const firstName = useRef("");
    const lastName = useRef("");
    const email = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreList = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 878, name: "Science Fiction" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
    ];
    const { setUser } = useStoreContext();

    const registerByGoogle = async () => {
        try {
            const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;   
            setUser(user);
            navigate("/movies");
        } catch {
            alert("An error has occurred please try again.")
        }
    }

    function register(event) {
        event.preventDefault();

        if (password.current.value !== confirmPassword.current.value) {
            alert("The passwords don't match.");
        } else if (selectedGenres.length < 10) {
            alert("Select at least 10 genres!");
        } else {
            setFirstName(firstName.current.value);
            setLastName(lastName.current.value);
            setEmail(email.current.value);
            setPassword(password.current.value);
            setSignedIn(true);
            setGenres(selectedGenres);
            navigate('/home');
        }
    }

    function registerByEmail() {

    }

    function selectGenre(id, name) {
        if (selectedGenres.some((genre) => genre.id === id)) {
            setSelectedGenres(selectedGenres.filter((genre) => genre.id !== id));
        } else {
            setSelectedGenres([...selectedGenres, { id, name }]);
        }
    }

    return (
        <div className='register-container'>
            <img src={Background} className="background" alt="Background" />
            <Header />
            <div className="island">
                <h2>Register</h2>
                <form action="#" onSubmit={(event) => register(event)}>
                    <div className="field">
                        <input type="text" ref={firstName} required />
                        <label>First Name</label>
                    </div>
                    <div className="field">
                        <input type="text" ref={lastName} required />
                        <label>Last Name</label>
                    </div>
                    <div className="field">
                        <input type="text" ref={email} required />
                        <label>Email</label>
                    </div>
                    <div className="field">
                        <input type="password" ref={password} required />
                        <label>Password</label>
                    </div>
                    <div className="field">
                        <input type="password" ref={confirmPassword} required />
                        <label>Re-enter Password</label>
                    </div>

                    <div className="genre-list-container">
                        <h2>Select Genres</h2>
                        <div className="genre-list">
                            {genreList.map((genre) => (
                                <button
                                    key={genre.id}
                                    type="button"
                                    onClick={() => selectGenre(genre.id, genre.name)}
                                    className={selectedGenres.some((g) => g.id === genre.id) ? "selected" : ""}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit">Create Account</button>
                    <button onClick={() => registerByGoogle()}>Register by Google</button>
                </form>
                <p>Already have an account? <a href="/login">Sign In</a></p>
            </div>
        </div>
    )
}

export default RegisterView;

