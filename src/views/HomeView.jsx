import './HomeView.css'
import Header from "../components/Header";
import Hero from "../components/Hero";
import Feature from '../components/Feature';
import Footer from '../components/Footer';

function HomeView() {
  return (
    <div>
      <Header />
      <Hero />
      <Feature />
      <Feature />
      <Hero />
      <Feature />
      <Feature />
      <Hero />
      <Feature />
      <Feature />
      <Footer />
    </div>
  )
}

export default HomeView