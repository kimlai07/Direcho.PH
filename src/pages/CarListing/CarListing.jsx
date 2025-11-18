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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(12); // Show 12 cars per page

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
    setCurrentPage(1); // Reset to first page after search
    setIsSearching(false);
  };

  // 4. Clear the search by resetting to the full list of cars
  const handleClearSearch = () => {
    setCars(allCars);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  // Page change handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
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
            {!isSearching && cars.length > carsPerPage && (
              <span className="page-info"> • Page {currentPage} of {totalPages}</span>
            )}
          </p>
        </div>
        
        <div className="car-listing-search">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        </div>
        
        <div className="car-grid">
          {isSearching ? (
            <div className="loading-spinner">Searching cars...</div>
          ) : currentCars.length > 0 ? (
            currentCars.map(car => (
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

        {/* Pagination Controls */}
        {!isSearching && cars.length > carsPerPage && (
          <div className="pagination-container">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="pagination-btn pagination-prev"
            >
              ← Previous
            </button>
            
            <div className="pagination-numbers">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className="pagination-btn pagination-next"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListing;