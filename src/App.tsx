import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CacheMonitor from './components/CacheMonitor/CacheMonitor';
import Home from './pages/Home/Home';
import CarListing from './pages/CarListing/CarListing';
import CarDetails from './pages/CarDetails/CarDetails';
import SellCar from './pages/SellCar/SellCar';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Calculate from './pages/Calculate/Calculate';
import NotFound from './pages/NotFound/NotFound';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarListing />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/sell" element={<SellCar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        {/* Cache Monitor - Remove in production or set to show only in development */}
        {process.env.NODE_ENV === 'development' && <CacheMonitor />}
      </div>
    </Router>
  );
};

export default App;