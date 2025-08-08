import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numPrice);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1494976788430-d32c4e0a34e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

  return (
    <div className="car-card">
      <img 
        src={car.image || car.imageUrl || defaultImage} 
        alt={`${car.make} ${car.model}`}
        className="car-image"
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />
      <div className="car-details">
        <h3 className="car-title">{car.make} {car.model}</h3>
        <p className="car-price">{formatPrice(car.price)}</p>
        <div className="car-specs">
          <span>{car.year}</span> • 
          <span>{car.mileage || car.kilometers || 'N/A'} km</span> • 
          <span>{car.fuelType || 'Petrol'}</span>
        </div>
        <Link to={`/car/${car.id}`}>
          <button className="car-button">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;