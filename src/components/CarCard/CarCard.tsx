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

  if (loading) {
    return (
      <CircularProgress 
        sx={{ 
          color: '#F78C1F',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
    );
  }
  
  if (error) {
    return (
      <Alert 
        severity="error"
        sx={{
          backgroundColor: '#FFE6E6',
          color: '#0F4C81',
          '& .MuiAlert-icon': {
            color: '#F78C1F'
          }
        }}
      >
        {error}
      </Alert>
    );
  }
  
  return (
    <Link to={`/car/${car.id}`} style={{ textDecoration: 'none' }}>
      <Card 
        className="car-card" 
        sx={{ 
          maxWidth: 345, 
          cursor: 'pointer',
          border: '1px solid #E8E8E8',
          borderRadius: '12px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(15, 76, 129, 0.15)',
            borderColor: '#F78C1F'
          }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={car.thumbnailUrl || car.photoUrls[0] || defaultImage}
          alt={`${car.brand} ${car.model}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
          sx={{
            objectFit: 'cover',
            borderRadius: '12px 12px 0 0'
          }}
        />
        <CardContent sx={{ p: 2.5 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{ 
              color: '#0F4C81',
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}
          >
            {car.brand} {car.model}
          </Typography>
          
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: '#F78C1F',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              mb: 2
            }}
          >
            {formatPrice(car.purchasePrice)}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#0F4C81',
                fontSize: '0.9rem'
              }}
            >
              <strong>Year:</strong> <span style={{ color: '#666666' }}>{car.year}</span>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#0F4C81',
                fontSize: '0.9rem'
              }}
            >
              <strong>Mileage:</strong> <span style={{ color: '#666666' }}>{car.mileage} km</span>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#0F4C81',
                fontSize: '0.9rem'
              }}
            >
              <strong>Location:</strong> <span style={{ color: '#666666' }}>{car.location}</span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;