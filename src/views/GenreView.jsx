import './GenreView.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../context'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase'

function GenreView() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const genreMap = new Map();
    const movieData = useParams();
    const [page, setPage] = useState(1);
    const { cart, setCart, user } = useStoreContext();
    const navigate = useNavigate();
    const [previousPurchases, setPreviousPurchases] = useState([]);
    
    useEffect(() => {
        async function fetchPreviousPurchases() {
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setPreviousPurchases(userData.previousPurchases || []);
            }
        }
        fetchPreviousPurchases();
    }, [user]);

    useEffect(() => {
        async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${movieData.genre_id}`
            );
            setMovies(response.data.results);
        }
        getMovies();
    }, [movieData.genre_id]);

    useEffect(() => {
        async function getGenre() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setGenre(response.data.genres);
        }
        getGenre();
    }, []);

    genre.forEach((obj) => {
        genreMap.set(obj.id, obj.name);
    });

    function loadMovie(id) {
        navigate(`/movies/details/${id}`);
    }

    async function getMoviesByPage(newPage) {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${movieData.genre_id}&page=${newPage}`
        );
        setMovies(response.data.results);
    }

    const addToCart = (e, movie) => {
        e.stopPropagation();
        
        if (previousPurchases.some(purchase => purchase.id === movie.id.toString())) {
            alert("You have already purchased this movie!");
            return;
        }

        console.log(movie);
        setCart((prevCart) => {
            const cart = prevCart.set(movie.id.toString(), { title: movie.original_title, url: movie.poster_path });
            localStorage.setItem(user.uid, JSON.stringify(cart.toJS()));
            return cart;
        });
    }

    return (
        <div>
            <div className="genre-movie-container">
                <h1 className="genre-title"> {genreMap.get(Number(movieData.genre_id))} </h1>
                <div className="movies">
                    {movies.map((movie) => (
                        <div className="movie" key={movie.id} onClick={() => loadMovie(movie.id)}>
                            <img
                                className="movie-poster"
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <span className="movie-title">{movie.original_title}</span>
                            <button onClick={(e) => addToCart(e, movie)}>
                                {cart.has(movie.id.toString()) ? 'Added' : previousPurchases.some(purchase => purchase.id === movie.id.toString()) ? "Purchased" : "Buy"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="page-turner">
                <p>Page {page}</p>
                <p>
                    <a
                        onClick={() => {
                            if (page > 1) {
                                const newPage = page - 1;
                                setPage(newPage);
                                getMoviesByPage(newPage);
                            }
                        }}
                    >
                        Previous&nbsp;&nbsp;
                    </a>
                    <a
                        onClick={() => {
                            if (page < 50) {
                                const newPage = page + 1;
                                setPage(newPage);
                                getMoviesByPage(newPage);
                            }
                        }}
                    >
                        Next
                    </a>
                </p>
            </div>
        </div>
    );
}

export default GenreView