import Genres from "../components/Genres"
import Header from "../components/Header"
import Footer from '../components/Footer'
import './MoviesView.css'
import { Outlet } from "react-router"


function MoviesView() {
  return (
    <div className="layout">
      <Header className="header" />
      <Genres className="sidebar" />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer className="footer" />
    </div>
  )
}

export default MoviesView