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
import ProtectedRoutes from './util/ProtectedRoutes'
import ErrorView from './views/ErrorView'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/movies" element={<MoviesView />}>
              <Route path="genre/:genre_id" element={<GenreView />} />
              <Route path="details/:id" element={<DetailView />} />
            </Route>
            <Route path="/cart" element={<CartView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Route>
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
