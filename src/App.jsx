import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './context'
import LoginView from './views/LoginView'
import HomeView from './views/HomeView'
import RegisterView from './views/RegisterView'
import MoviesView from './views/MoviesView'
import GenreView from './views/GenreView'
import DetailView from './views/DetailView'
import CartView from './views/CartView'
import SettingsView from './views/SettingsView'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/movies" element={<MoviesView />}>
            <Route path="genre/:genre_id" element={<GenreView />} />
            <Route path="details/:id" element={<DetailView />} />
          </Route>
          <Route path="/cart" element={<CartView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
