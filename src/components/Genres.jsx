import './Genres.css'
import { useNavigate } from 'react-router';
import { useStoreContext } from '../context';

function Genres() {
    const navigate = useNavigate();
    const {genres} = useStoreContext();
    const genreList = (genres);

    function loadGenre(id) {
        navigate(`genre/${id}`);
    }

    return (
        <div className="genre-container">
            <ol className="genres-list">
                {genreList
                    .slice(0, 20)
                    .map((genre) => (
                        <ul key={genre.id} className="genre" onClick={() => { loadGenre(genre.id);}}>
                            {genre.name}
                        </ul>
                    ))}
            </ol>
        </div>
    )

}

export default Genres