import './GenreView.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function GenreView() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const genreMap = new Map();
    const params = useParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${params.genre_id}`
            );
            setMovies(response.data.results);
        })();

        (async function getGenre() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setGenre(response.data.genres);
        })();
    }, []);

    async function getMoviesByPage(page) {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${params.genre_id}&page=${page}`
        );
        setMovies(response.data.results);
    }

    genre.forEach((obj) => {
        genreMap.set(obj.id, obj.name);
    });

    function loadMovie(id) {
        navigate(`/movies/details/${id}`);
    }

    return (
        <div>
            <div className="genre-movie-container">
                <h1 className="genre-title"> {genreMap.get(Number(params.genre_id))} </h1>
                <div className="movies">
                    {movies.slice(0, 21).map((movie, index) => (
                        <div className="movie" key={index} onClick={() => loadMovie(movie.id)}>
                            <img
                                className="movie-poster"
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <span className="movie-title">{movie.original_title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="page-turner">
                <p>Page {page}</p>
                <p>
                    <a onClick={() => {
                        if (page > 1) {
                            setPage(page - 1), getMoviesByPage(page - 1)
                        }
                    }}>
                        Previous
                    </a>    <a onClick={() => {
                        if (page < 50) {
                            setPage(page + 1), getMoviesByPage(page + 1)
                        }
                    }}>Next</a></p>
            </div>
        </div>
    )
}

export default GenreView