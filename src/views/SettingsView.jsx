import './SettingsView.css';
import { useStoreContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { auth, firestore } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile, updatePassword } from 'firebase/auth';

function SettingsView() {
  const { user, setUser, genres, setGenres, previousPurchases } = useStoreContext();
  const navigate = useNavigate();

  const [newFirstName, setNewFirstName] = useState(user.displayName.split(' ')[0]);
  const [newLastName, setNewLastName] = useState(user.displayName.split(' ')[1]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGenres, setSelectedGenres] = useState(genres || []);
  const isGoogleUser = user.providerData.some(profile => profile.providerId === 'google.com');

  const genresList = [
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

  const saveChanges = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("The passwords don't match!");
      return;
    } else if (selectedGenres.length < 10) {
      alert("Select at least 10 genres!");
      return;
    } else {
      if (!isGoogleUser) {
        try {
          const updatedUser = { ...user, displayName: `${newFirstName} ${newLastName}` };
          await updateProfile(auth.currentUser, { displayName: updatedUser.displayName });
          await updatePassword(auth.currentUser, newPassword);
        } catch {
          alert("An error occurred while updating your settings!");
          return;
        }
      }
      setGenres(selectedGenres);
      const docRef = doc(firestore, "users", user.uid);
      await updateDoc(docRef, { genres: selectedGenres, });
      alert("Your settings have been saved!");
      navigate("/movies");
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
            required={isGoogleUser}
            readOnly={isGoogleUser}
          />
          <label>First Name</label>
        </div>
        <div className="settings-field">
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            required={isGoogleUser}
            readOnly={isGoogleUser}
          />
          <label>Last Name</label>
        </div>
        <div className="settings-field">
          <input
            type="email"
            value={user.email}
            readOnly
          />
          <label>Email</label>
        </div>
        {!isGoogleUser && (<>
          <div className="settings-field">
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>New Password</label>
          </div>
          <div className="settings-field">
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
        </>
        )}
        <div className="genre-list-container">
          <h2>Select Genres</h2>
          <div className="genre-list">
            {genresList.map((genre) => {
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
      {previousPurchases && previousPurchases.length > 0 && (
        <div className="settings-purchases-container">
          <h3 className="settings-purchases-title">Your Past Purchases</h3>
          <div className="settings-purchases-list">
            {previousPurchases.map((purchase, index) => (
              <div className="settings-purchase-item" key={index}>
                <img
                  className="settings-purchase-img"
                  src={`https://image.tmdb.org/t/p/w500${purchase.poster_path}`}
                  alt={purchase.title}
                  onClick={() => navigate(`/movies/details/${purchase.id}`)}
                />
                <div className="settings-purchase-details">
                  <h2 className="settings-purchase-title">{purchase.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsView;