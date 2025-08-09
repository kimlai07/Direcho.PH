import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { Vehicle } from '../../types/vehicle';
import { JSX } from 'react/jsx-runtime';

interface CarCardProps {
  car: Vehicle;
  loading?: boolean;
  error?: string;
}

const CarCard = ({ car, loading = false, error }: CarCardProps): JSX.Element => {
  const formatPrice = (price: string | null): string => {
    if (!price) return 'Price on request';
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return 'Price on request';
    
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numPrice);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  
  return (
    <Link to={`/car/${car.id}`} style={{ textDecoration: 'none' }}>
      <Card className="car-card" sx={{ maxWidth: 345, cursor: 'pointer' }}>
        <CardMedia
          component="img"
          height="200"
          image={car.thumbnailUrl || car.photoUrls[0] || defaultImage}
          alt={`${car.brand} ${car.model}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {car.brand} {car.model}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            {formatPrice(car.purchasePrice)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Year: {car.year}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mileage: {car.mileage} km
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {car.location}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;