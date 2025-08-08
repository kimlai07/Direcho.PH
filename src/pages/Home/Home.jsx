import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CarCard from '../../components/CarCard/CarCard';
import { fetchVehicles } from '../../services/api';
import './Home.css';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    getVehicles();
  }, []);

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  return (
    <div className="home">
      {/* Mobile Hero Section */}
      <div className="hero-section">
  <div className="hero-content">
    <div className="hero-text">
      <h1 className="hero-title">Philippines #1 platform to buy & sell cars</h1>
      <p className="hero-subtitle">Over 10,000+ verified cars • Best prices • Instant selling...COMING SOON!!</p>
    </div>
  </div>
  <div className="search-section-overlay">
    <SearchBar onSearch={handleSearch} />
  </div>
</div>

      {/* Services Section */}
      <div className="services-section">
        <div className="container">
          <h2 className="section-title">Why Choose Direcho.ph?</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>Wide Selection</h3>
              <p>Choose from thousands of verified cars</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3>Quality Assured</h3>
              <p>Every car is thoroughly inspected</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Get the best value for your money</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Easy Documentation</h3>
              <p>Hassle-free paperwork and registration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Cars</h2>
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="car-grid">
              {vehicles.map(vehicle => (
                <CarCard key={vehicle.id} car={vehicle} />
              ))}
            </div>
          )}
          <div className="view-all-container">
            <button className="view-all-btn">View All Cars</button>
          </div>
        </div>
      </div>

      {/* Mobile App Download Section */}
      <div className="mobile-app-section">
        <div className="container">
          <div className="app-content">
            <h2>Download Our App</h2>
            <p>Get the best deals on your mobile</p>
            <div className="app-buttons">
              <button className="app-btn">Download App</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;