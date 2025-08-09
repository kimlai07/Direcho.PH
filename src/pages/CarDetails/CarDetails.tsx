import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  LocationOn,
  Speed,
  LocalGasStation,
  DirectionsCar,
  CalendarToday
} from '@mui/icons-material';
import { getVehicleById } from '../../services/api';
import { Vehicle } from '../../types/vehicle';
import './CarDetails.css';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          const response = await getVehicleById(id);
          setCar(response.data);
        }
      } catch (err) {
        setError('Error fetching car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return 'Price on request';
    
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numPrice);
  };

  const handleNextImage = () => {
    if (car && car.photoUrls.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === car.photoUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (car && car.photoUrls.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? car.photoUrls.length - 1 : prev - 1
      );
    }
  };

  const defaultImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !car) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Car not found'}</Alert>
      </Container>
    );
  }

  const images = car.photoUrls.length > 0 ? car.photoUrls : [defaultImage];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack 
        direction={{ xs: 'column', lg: 'row' }} 
        spacing={{ xs: 3, md: 4 }}
        alignItems="flex-start"
      >
        {/* Image Slideshow */}
        <Box sx={{ 
          width: { xs: '100%', lg: '65%' },
          maxWidth: '800px'
        }}>
          <Card elevation={3} sx={{ overflow: 'hidden' }}>
            <Box position="relative">
              <Box
                component="img"
                src={images[currentImageIndex]}
                alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
                sx={{
                  width: '100%',
                  height: { xs: 250, sm: 350, md: 450, lg: 500 },
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImage;
                }}
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    size="large"
                    sx={{
                      position: 'absolute',
                      left: { xs: 8, md: 16 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)'
                      },
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 }
                    }}
                  >
                    <ArrowBackIos fontSize="inherit" />
                  </IconButton>
                  
                  <IconButton
                    onClick={handleNextImage}
                    size="large"
                    sx={{
                      position: 'absolute',
                      right: { xs: 8, md: 16 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)'
                      },
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 }
                    }}
                  >
                    <ArrowForwardIos fontSize="inherit" />
                  </IconButton>
                </>
              )}
              
              {/* Image Counter */}
              <Paper
                elevation={2}
                sx={{
                  position: 'absolute',
                  bottom: { xs: 8, md: 16 },
                  right: { xs: 8, md: 16 },
                  px: { xs: 1.5, md: 2 },
                  py: { xs: 0.5, md: 1 },
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  borderRadius: 1
                }}
              >
                <Typography variant="caption" fontSize={{ xs: '0.7rem', md: '0.75rem' }}>
                  {currentImageIndex + 1} / {images.length}
                </Typography>
              </Paper>
            </Box>
          </Card>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              gap: 1, 
              overflowX: 'auto', 
              pb: 1,
              '&::-webkit-scrollbar': {
                height: 6,
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'grey.200',
                borderRadius: 3,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'grey.400',
                borderRadius: 3,
              }
            }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: { xs: 60, sm: 80 },
                    height: { xs: 45, sm: 60 },
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: currentImageIndex === index ? 'primary.main' : 'transparent',
                    opacity: currentImageIndex === index ? 1 : 0.7,
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    '&:hover': {
                      opacity: 1,
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Car Details */}
        <Box sx={{ 
          width: { xs: '100%', lg: '35%' },
          minWidth: { lg: '350px' },
          position: { lg: 'sticky' },
          top: { lg: 20 }
        }}>
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                fontWeight="bold"
                fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.125rem' }}
              >
                {car.brand} {car.model}
              </Typography>
              
              <Typography 
                variant="h5" 
                color="primary" 
                gutterBottom 
                fontWeight="bold"
                fontSize={{ xs: '1.25rem', sm: '1.5rem' }}
              >
                {formatPrice(car.purchasePrice)}
              </Typography>

              <Chip 
                label={car.purchaseStatus} 
                color={car.purchaseStatus === 'AVAILABLE' ? 'success' : 'default'}
                sx={{ mb: 3, fontWeight: 'medium' }}
              />

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CalendarToday color="action" fontSize="small" />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }}>
                    <strong>Year:</strong> {car.year}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Speed color="action" fontSize="small" />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }}>
                    <strong>Mileage:</strong> {car.mileage} km
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocalGasStation color="action" fontSize="small" />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }}>
                    <strong>Fuel Type:</strong> {car.fuelType}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <DirectionsCar color="action" fontSize="small" />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }}>
                    <strong>Transmission:</strong> {car.transmission}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocationOn color="action" fontSize="small" />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }}>
                    <strong>Location:</strong> {car.location}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.85rem', md: '0.875rem' }}>
                  <strong>Color:</strong> {car.color}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.85rem', md: '0.875rem' }}>
                  <strong>Body Type:</strong> {car.bodyType}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.85rem', md: '0.875rem' }}>
                  <strong>Variant:</strong> {car.variant}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.85rem', md: '0.875rem' }}>
                  <strong>VIN:</strong> {car.vin}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.85rem', md: '0.875rem' }}>
                  <strong>Dealer:</strong> {car.dealerName}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
};

export default CarDetails;