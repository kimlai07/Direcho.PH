import React, { useEffect, useState } from 'react';
import CarCard from '../../components/CarCard/CarCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { fetchAllCars, searchVehicles } from '../../services/api';
import './CarListing.css';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = async (searchParams) => {
    console.log('Search params:', searchParams);
    setIsSearching(true);
    setError(null);
    
    try {
      let results;
      
      // If no search parameters, fetch all cars
      if (!searchParams.searchTerm && !searchParams.budget && !searchParams.city) {
        results = await fetchAllCars();
      } else {
        // Use search API with parameters
        results = await searchVehicles(searchParams);
      }
      
      setCars(results);
    } catch (error) {
      setError('Error searching cars: ' + error.message);
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchAllCars();
      setCars(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          <p className="car-listing-subtitle">
            {isSearching ? 'Searching...' : `Found ${cars.length} car${cars.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        
        <div className="car-listing-search">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        </div>
        
        <div className="car-grid">
          {isSearching ? (
            <div className="loading-spinner">Searching cars...</div>
          ) : cars.length > 0 ? (
            cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))
          ) : (
            <div className="no-results">
              <h3>No cars found</h3>
              <p>Try adjusting your search criteria</p>
              <button onClick={handleClearSearch} className="clear-search-btn">
                Show All Cars
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListing;