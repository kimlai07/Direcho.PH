import React, { useEffect, useState } from 'react';
import CarCard from '../../components/CarCard/CarCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { fetchAllCars } from '../../services/api';
import './CarListing.css';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await fetchAllCars();
        setCars(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
    // Implement search functionality here
  };

  if (loading) {
    return (
      <div className="car-listing">
        <div className="car-listing-container">
          <div className="loading-spinner">Loading cars...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-listing">
        <div className="car-listing-container">
          <div className="error-message">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-listing">
      <div className="car-listing-container">
        <div className="car-listing-header">
          <h1 className="car-listing-title">All Cars</h1>
        </div>
        
        <div className="car-listing-search">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="car-grid">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarListing;