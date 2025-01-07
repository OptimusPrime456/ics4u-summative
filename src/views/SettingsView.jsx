import './SettingsView.css';
import { useStoreContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';

function SettingsView() {
  const { firstName, setFirstName, lastName, setLastName, email, genres, setGenres } = useStoreContext();
  const navigate = useNavigate();
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [selectedGenres, setSelectedGenres] = useState(genres);

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

  function selectGenre(id, name) {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.some((genre) => genre.id === id)) {
        return prevSelected.filter((genre) => genre.id !== id);
      }
      return [...prevSelected, { id, name }];
    });
  }

  function saveChanges(event) {
    event.preventDefault();

    if (selectedGenres.length < 10) {
      alert("Select at least 10 genres!");
    } else {
      setFirstName(newFirstName);
      setLastName(newLastName);
      setGenres(selectedGenres);
      navigate('/settings');
    }
  }

  return (
    <>
      <Header />
      <form className="settings-form" onSubmit={saveChanges}>
        <div className="settings-field">
          <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            required
          />
          <label>First Name</label>
        </div>
        <div className="settings-field">
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            required
          />
          <label>Last Name</label>
        </div>
        <div className="settings-field">
          <input type="text" value={email} readOnly />
          <label>Email</label>
        </div>
        <div className="genre-list-container">
          <h2>Select Genres</h2>
          <div className="genre-list">
            {genreList.map((genre) => {
              const isSelected = selectedGenres.some((g) => g.id === genre.id);
              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => selectGenre(genre.id, genre.name)}
                  className={isSelected ? "selected" : ""}
                  aria-pressed={isSelected}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}

export default SettingsView;
