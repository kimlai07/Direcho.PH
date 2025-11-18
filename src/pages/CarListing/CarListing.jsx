import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  
  // Infinite scroll state
  const [displayedCars, setDisplayedCars] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const carsPerPage = 12;
  const observer = useRef();
  
  // Last element ref for intersection observer
  const lastCarElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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

  // 3. Load more cars when page changes (infinite scroll)
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * carsPerPage;
    const newDisplayedCars = cars.slice(startIndex, endIndex);
    
    setDisplayedCars(newDisplayedCars);
    setHasMore(endIndex < cars.length);
  }, [page, cars]);

  // Helper to check if any search parameters are active
  const hasSearchParams = (params) => {
    if (!params) return false;
    return Object.values(params).some(value => value && value !== '');
  };

  // Perform search on the client-side using the 'allCars' state
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
    setPage(1); // Reset to first page after search
    setIsSearching(false);
  };

  // Clear the search by resetting to the full list of cars
  const handleClearSearch = () => {
    setCars(allCars);
    setPage(1); // Reset to first page
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {!isSearching && displayedCars.length > 0 && displayedCars.length < cars.length && (
              <span className="page-info"> • Showing {displayedCars.length} of {cars.length}</span>
            )}
          </p>
        </div>
        
        <div className="car-listing-search">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        </div>
        
        <div className="car-grid">
          {isSearching ? (
            <div className="loading-spinner">Searching cars...</div>
          ) : displayedCars.length > 0 ? (
            displayedCars.map((car, index) => {
              // Attach ref to the last element
              if (displayedCars.length === index + 1) {
                return <div ref={lastCarElementRef} key={car.id}><CarCard car={car} /></div>;
              } else {
                return <CarCard key={car.id} car={car} />;
              }
            })
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

        {/* Loading indicator when fetching more */}
        {!isSearching && hasMore && displayedCars.length > 0 && displayedCars.length < cars.length && (
          <div className="loading-more">
            <div className="loading-spinner-small">Loading more cars...</div>
          </div>
        )}

        {/* Scroll to top button */}
        {displayedCars.length > carsPerPage && (
          <button className="scroll-to-top" onClick={scrollToTop} title="Scroll to top">
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default CarListing;