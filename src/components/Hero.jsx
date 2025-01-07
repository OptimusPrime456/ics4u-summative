import './Hero.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useStoreContext } from '../context'

function Hero() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const { cart, setCart } = useStoreContext();

  useEffect(() => {
    (async function getMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setMovie(response.data.results[Math.floor(Math.random() * 20)]);
    })();
  }, []);

  function loadMovie(id) {
    navigate(`/movies/details/${id}`);
  }

  return (
    <div className="featured-content" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #111111), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="featured-container">
        <h1 className="featured-title">{movie.original_title}</h1>
        <p className="featured-description">{movie.overview}</p>
        <button className="featured-button details" onClick={() => { loadMovie(movie.id) }}>Details</button>
        <button className="featured-button buy" onClick={() => {setCart((prevCart) => prevCart.set(movie.id, {title: movie.original_title, poster: movie.poster_path}))}}>{`${cart.has(movie.id) ? 'Added' : 'Buy'}`}</button>
      </div>
    </div>
  )
}

export default Hero