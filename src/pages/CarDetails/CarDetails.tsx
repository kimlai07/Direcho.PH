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
  Stack,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  LocationOn,
  Speed,
  LocalGasStation,
  DirectionsCar,
  CalendarToday,
  OpenInNew,
  PhotoLibrary,
  PlayCircle
} from '@mui/icons-material';
import { getVehicleById } from '../../services/api';
import { Vehicle } from '../../types/vehicle';
import './CarDetails.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`media-tabpanel-${index}`}
      aria-labelledby={`media-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);

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

  const handleGoogleDriveClick = () => {
    if (car?.googleDriveUrl) {
      window.open(car.googleDriveUrl, '_blank');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const defaultImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#F78C1F',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
        />
      </Box>
    );
  }

  if (error || !car) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
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
          {error || 'Car not found'}
        </Alert>
      </Container>
    );
  }

  const images = car.photoUrls.length > 0 ? car.photoUrls : [defaultImage];
  const youtubeVideoId = car.videoUrl ? getYouTubeVideoId(car.videoUrl) : null;
  const hasVideo = !!youtubeVideoId;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack 
        direction={{ xs: 'column', lg: 'row' }} 
        spacing={{ xs: 3, md: 4 }}
        alignItems="flex-start"
      >
        {/* Media Section (Images & Video) */}
        <Box sx={{ 
          width: { xs: '100%', lg: '65%' },
          maxWidth: '800px'
        }}>
          {/* Tabs for Media */}
          {hasVideo && (
            <Box sx={{ borderBottom: 1, borderColor: '#E8E8E8', mb: 2 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    color: '#666666',
                    fontWeight: 'medium',
                    textTransform: 'none',
                    fontSize: '1rem'
                  },
                  '& .Mui-selected': {
                    color: '#F78C1F !important'
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#F78C1F'
                  }
                }}
              >
                <Tab 
                  icon={<PhotoLibrary />} 
                  label="Photos" 
                  iconPosition="start"
                  sx={{ minHeight: 48 }}
                />
                <Tab 
                  icon={<PlayCircle />} 
                  label="Video" 
                  iconPosition="start"
                  sx={{ minHeight: 48 }}
                />
              </Tabs>
            </Box>
          )}

          {/* Photos Tab */}
          <TabPanel value={tabValue} index={0}>
            <Card 
              elevation={3} 
              sx={{ 
                overflow: 'hidden',
                border: '1px solid #E8E8E8',
                borderRadius: '12px'
              }}
            >
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
                        background: 'linear-gradient(135deg, #F78C1F, #E07B0E)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E07B0E, #D06D0A)',
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        transition: 'all 0.3s ease'
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
                        background: 'linear-gradient(135deg, #F78C1F, #E07B0E)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E07B0E, #D06D0A)',
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        transition: 'all 0.3s ease'
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
                    background: 'linear-gradient(135deg, #0F4C81, #0A3A6B)',
                    color: 'white',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="caption" fontSize={{ xs: '0.7rem', md: '0.75rem' }} fontWeight="medium">
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
                  backgroundColor: '#F5F5F5',
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(135deg, #F78C1F, #E07B0E)',
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
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: 2,
                      borderColor: currentImageIndex === index ? '#F78C1F' : '#E8E8E8',
                      opacity: currentImageIndex === index ? 1 : 0.7,
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      '&:hover': {
                        opacity: 1,
                        transform: 'scale(1.05)',
                        borderColor: '#F78C1F',
                        boxShadow: '0 4px 12px rgba(247, 140, 31, 0.3)'
                      }
                    }}
                  />
                ))}
              </Box>
            )}
          </TabPanel>

          {/* Video Tab */}
          {hasVideo && (
            <TabPanel value={tabValue} index={1}>
              <Card 
                elevation={3} 
                sx={{ 
                  overflow: 'hidden',
                  border: '1px solid #E8E8E8',
                  borderRadius: '12px'
                }}
              >
                <Box 
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0,
                    overflow: 'hidden'
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                    title={`${car.brand} ${car.model} Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px'
                    }}
                  />
                </Box>
              </Card>
            </TabPanel>
          )}
        </Box>

        {/* Car Details */}
        <Box sx={{ 
          width: { xs: '100%', lg: '35%' },
          minWidth: { lg: '350px' },
          position: { lg: 'sticky' },
          top: { lg: 20 }
        }}>
          <Card 
            elevation={3}
            sx={{
              border: '1px solid #E8E8E8',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)'
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                fontWeight="bold"
                fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.125rem' }}
                sx={{ color: '#0F4C81' }}
              >
                {car.brand} {car.model}
              </Typography>
              
              <Typography 
                variant="h5" 
                gutterBottom 
                fontWeight="bold"
                fontSize={{ xs: '1.25rem', sm: '1.5rem' }}
                sx={{ color: '#F78C1F' }}
              >
                {formatPrice(car.purchasePrice)}
              </Typography>

              <Chip 
                label={car.purchaseStatus} 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'medium',
                  backgroundColor: car.purchaseStatus === 'AVAILABLE' ? '#E8F5E8' : '#F5F5F5',
                  color: car.purchaseStatus === 'AVAILABLE' ? '#2E7D32' : '#666666',
                  border: `1px solid ${car.purchaseStatus === 'AVAILABLE' ? '#4CAF50' : '#CCCCCC'}`
                }}
              />

              {/* Google Drive Button */}
              {car.googleDriveUrl && (
                <Button
                  variant="contained"
                  startIcon={<OpenInNew />}
                  onClick={handleGoogleDriveClick}
                  sx={{
                    mb: 3,
                    width: '100%',
                    py: 1.5,
                    fontWeight: 'medium',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    background: 'linear-gradient(135deg, #F78C1F, #E07B0E)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #E07B0E, #D06D0A)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(247, 140, 31, 0.4)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    borderRadius: '8px',
                    textTransform: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Download Images
                </Button>
              )}

              <Divider sx={{ mb: 3, backgroundColor: '#E8E8E8' }} />

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CalendarToday sx={{ color: '#F78C1F', fontSize: '1.2rem' }} />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Year:</strong> <span style={{ color: '#666666' }}>{car.year}</span>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Speed sx={{ color: '#F78C1F', fontSize: '1.2rem' }} />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Mileage:</strong> <span style={{ color: '#666666' }}>{car.mileage} km</span>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocalGasStation sx={{ color: '#F78C1F', fontSize: '1.2rem' }} />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Fuel Type:</strong> <span style={{ color: '#666666' }}>{car.fuelType}</span>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <DirectionsCar sx={{ color: '#F78C1F', fontSize: '1.2rem' }} />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Transmission:</strong> <span style={{ color: '#666666' }}>{car.transmission}</span>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocationOn sx={{ color: '#F78C1F', fontSize: '1.2rem' }} />
                  <Typography variant="body1" fontSize={{ xs: '0.9rem', md: '1rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Location:</strong> <span style={{ color: '#666666' }}>{car.location}</span>
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3, backgroundColor: '#E8E8E8' }} />

              <Stack spacing={1}>
                <Typography variant="body2" fontSize={{ xs: '0.85rem', md: '0.875rem' }} sx={{ color: '#0F4C81' }}>
                  <strong>Color:</strong> <span style={{ color: '#666666' }}>{car.color}</span>
                </Typography>
                <Typography variant="body2" fontSize={{ xs: '0.85rem', md: '0.875rem' }} sx={{ color: '#0F4C81' }}>
                  <strong>Body Type:</strong> <span style={{ color: '#666666' }}>{car.bodyType}</span>
                </Typography>
                <Typography variant="body2" fontSize={{ xs: '0.85rem', md: '0.875rem' }} sx={{ color: '#0F4C81' }}>
                  <strong>Variant:</strong> <span style={{ color: '#666666' }}>{car.variant}</span>
                </Typography>
                <Typography variant="body2" fontSize={{ xs: '0.85rem', md: '0.875rem' }} sx={{ color: '#0F4C81' }}>
                  <strong>VIN:</strong> <span style={{ color: '#666666' }}>{car.vin}</span>
                </Typography>
                {car.maxLoanPercentage && (
                  <Typography variant="body2" fontSize={{ xs: '0.85rem', md: '0.875rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Max Loan Percentage:</strong> <span style={{ color: '#666666' }}>{car.maxLoanPercentage}%</span>
                  </Typography>
                )}
                {car.maxMonthlyTerms && (
                  <Typography variant="body2" fontSize={{ xs: '0.85rem', md: '0.875rem' }} sx={{ color: '#0F4C81' }}>
                    <strong>Max Monthly Terms:</strong> <span style={{ color: '#666666' }}>{car.maxMonthlyTerms} months</span>
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
};

export default CarDetails;