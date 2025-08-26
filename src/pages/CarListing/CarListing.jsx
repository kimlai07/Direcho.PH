import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from '../../components/CarCard/CarCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchAllCars } from '../../services/api';
import './CarListing.css';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]); // Master list of all cars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  // 1. Fetch all cars only once when the component mounts
  useEffect(() => {
    const fetchInitialCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllCars();
        setAllCars(data); // Store the master list
        setCars(data);    // Set the initial list to display
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialCars();
  }, []);

  // 2. Handle searches passed from other pages (e.g., Home)
  useEffect(() => {
    const initialSearchParams = location.state?.searchParams;
    if (hasSearchParams(initialSearchParams) && allCars.length > 0) {
      handleSearch(initialSearchParams);
    }
  }, [location.state, allCars]);

  // Helper to check if any search parameters are active
  const hasSearchParams = (params) => {
    if (!params) return false;
    return Object.values(params).some(value => value && value !== '');
  };

  // 3. Perform search on the client-side using the 'allCars' state
  const handleSearch = (searchParams) => {
    setIsSearching(true);
    
    let filteredData = [...allCars];

    // Filter by wildcard searchTerm
    if (searchParams.searchTerm) {
      const lowercasedTerm = searchParams.searchTerm.toLowerCase();
      filteredData = filteredData.filter(car => 
        (car.brand && car.brand.toLowerCase().includes(lowercasedTerm)) ||
        (car.model && car.model.toLowerCase().includes(lowercasedTerm)) ||
        (car.year && car.year.toString().includes(lowercasedTerm)) ||
        (car.variant && car.variant.toLowerCase().includes(lowercasedTerm)) ||
        (car.bodyType && car.bodyType.toLowerCase().includes(lowercasedTerm)) ||
        (car.vin && car.vin.toLowerCase().includes(lowercasedTerm))
      );
    }

    setCars(filteredData);
    setIsSearching(false);
  };

  // 4. Clear the search by resetting to the full list of cars
  const handleClearSearch = () => {
    setCars(allCars);
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