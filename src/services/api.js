import axios from 'axios';
import { Vehicle, ApiResponse } from '../types/vehicle';
import { cache, CACHE_TTL } from '../utils/cache';

// Keep original endpoints for future use
const privateUrlVehicle = 'https://l1y3094sxb.execute-api.us-east-1.amazonaws.com/dev/vehicle';
const prodUrlVehicle = 'https://13zbodb0tk.execute-api.ap-east-1.amazonaws.com/bentacars/vehicle?lastMonthOnly=true';
const prodUrlVehicleAllCars = 'https://13zbodb0tk.execute-api.ap-east-1.amazonaws.com/bentacars/vehicle?filterSold=true';
const newProdVehicleUrl= 'https://b6f0c09yu4.execute-api.ap-east-1.amazonaws.com/Prod/vehicles';
const newProdVehicleUrls = 'https://l1y3094sxb.execute-api.us-east-1.amazonaws.com/dev/vehicle'

// Cache keys
const CACHE_KEYS = {
    ALL_VEHICLES: 'all_vehicles',
    NEW_VEHICLES: 'new_vehicles',
    USER_PROFILE: 'user_profile',
    USER_CARS: 'user_cars',
    VEHICLE_BY_ID: 'vehicle_'
};

// Mock data
const mockVehicles = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 1200000,
        mileage: 25000,
        fuelType: 'Petrol',
        location: 'Manila',
        imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Well-maintained Toyota Camry with excellent fuel efficiency'
    },
    {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        price: 950000,
        mileage: 35000,
        fuelType: 'Petrol',
        location: 'Quezon City',
        imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Sporty Honda Civic with modern features'
    },
    {
        id: 3,
        make: 'Mitsubishi',
        model: 'Montero Sport',
        year: 2021,
        price: 1800000,
        mileage: 15000,
        fuelType: 'Diesel',
        location: 'Cebu',
        imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Powerful SUV perfect for family adventures'
    },
    {
        id: 4,
        make: 'Nissan',
        model: 'Navara',
        year: 2020,
        price: 1350000,
        mileage: 28000,
        fuelType: 'Diesel',
        location: 'Davao',
        imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Reliable pickup truck for work and leisure'
    },
    {
        id: 5,
        make: 'Hyundai',
        model: 'Accent',
        year: 2018,
        price: 680000,
        mileage: 45000,
        fuelType: 'Petrol',
        location: 'Manila',
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Affordable and fuel-efficient sedan'
    },
    {
        id: 7,
        make: 'Suzuki',
        model: 'Swift',
        year: 2020,
        price: 720000,
        mileage: 22000,
        fuelType: 'Petrol',
        location: 'Taguig',
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Zippy hatchback perfect for urban driving'
    },
    {
        id: 8,
        make: 'Isuzu',
        model: 'D-Max',
        year: 2021,
        price: 1450000,
        mileage: 18000,
        fuelType: 'Diesel',
        location: 'Pasig',
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Tough and reliable pickup truck'
    }
];

// Flag to switch between mock and real API calls
const USE_MOCK_DATA = false;

export const fetchVehicles = async () => {
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.ALL_VEHICLES);
    if (cachedData) {
        return cachedData;
    }

    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        cache.set(CACHE_KEYS.ALL_VEHICLES, mockVehicles, CACHE_TTL.MEDIUM);
        return mockVehicles;
    }
    
    try {
        console.log('Fetching vehicles from database...');
        const response = await axios.get(newProdVehicleUrl);
        const data = response.data;
        
        // Cache the response for 5 minutes
        cache.set(CACHE_KEYS.ALL_VEHICLES, data, CACHE_TTL.MEDIUM);
        
        console.log('Fetched and cached vehicles:', data);
        return data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export const fetchAllCars = async () => {
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.ALL_VEHICLES);
    if (cachedData) {
        return cachedData;
    }

    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        cache.set(CACHE_KEYS.ALL_VEHICLES, mockVehicles, CACHE_TTL.MEDIUM);
        return mockVehicles;
    }
    
    try {
        console.log('Fetching all cars from database...');
        const response = await axios.get(newProdVehicleUrl);
        const data = response.data;
        
        // Cache the response for 5 minutes
        cache.set(CACHE_KEYS.ALL_VEHICLES, data, CACHE_TTL.MEDIUM);
        
        return data;
    } catch (error) {
        console.error('Error fetching all cars:', error);
        throw error;
    }
};

export const fetchNewVehicles = async () => {
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.NEW_VEHICLES);
    if (cachedData) {
        return cachedData;
    }

    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const filteredData = mockVehicles.filter(car => car.year >= 2020);
        cache.set(CACHE_KEYS.NEW_VEHICLES, filteredData, CACHE_TTL.MEDIUM);
        return filteredData;
    }
    
    try {
        console.log('Fetching new vehicles from database...');
        const response = await axios.get(newProdVehicleUrl);
        const data = response.data;
        
        // Cache the response for 5 minutes
        cache.set(CACHE_KEYS.NEW_VEHICLES, data, CACHE_TTL.MEDIUM);
        
        return data;
    } catch (error) {
        console.error('Error fetching new vehicles:', error);
        throw error;
    }
};

export const getVehicleById = async (id) => {
    // Check cache first for specific vehicle
    const cacheKey = CACHE_KEYS.VEHICLE_BY_ID + id;
    const cachedVehicle = cache.get(cacheKey);
    if (cachedVehicle) {
        return { data: cachedVehicle };
    }

    try {
        // Fetch all cars (will use cache if available)
        const allCars = await fetchAllCars();
        const vehicle = allCars.find(car => car.id.toString() === id.toString());
        
        if (vehicle) {
            // Cache this specific vehicle for faster access (15 minutes)
            cache.set(cacheKey, vehicle, CACHE_TTL.LONG);
            return { data: vehicle };
        } else {
            throw new Error('Vehicle not found');
        }
    } catch (error) {
        console.error('Error fetching vehicle by id:', error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.USER_PROFILE);
    if (cachedData) {
        return cachedData;
    }

    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        const profileData = {
            id: 1,
            name: 'Juan Dela Cruz',
            email: 'juan.delacruz@example.com',
            phone: '+63 917 123 4567',
            location: 'Manila, Philippines',
            joinDate: '2023-01-15',
            totalSales: 3,
            totalPurchases: 1
        };
        // Cache user profile for 15 minutes
        cache.set(CACHE_KEYS.USER_PROFILE, profileData, CACHE_TTL.LONG);
        return profileData;
    }
    
    // Mock data for now - replace with actual API call
    const profileData = {
        name: 'Juan Dela Cruz',
        email: 'juan.delacruz@example.com',
        phone: '+63 917 123 4567'
    };
    
    // Cache user profile for 15 minutes
    cache.set(CACHE_KEYS.USER_PROFILE, profileData, CACHE_TTL.LONG);
    return profileData;
};

export const fetchUserCars = async () => {
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.USER_CARS);
    if (cachedData) {
        return cachedData;
    }

    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        const userCarsData = [
            {
                id: 101,
                make: 'Toyota',
                model: 'Vios',
                year: 2018,
                price: 650000,
                status: 'For Sale',
                listedDate: '2024-01-10',
                imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 102,
                make: 'Honda',
                model: 'City',
                year: 2019,
                price: 750000,
                status: 'Sold',
                listedDate: '2023-12-15',
                soldDate: '2024-01-05',
                imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ];
        // Cache user cars for 5 minutes (changes more frequently)
        cache.set(CACHE_KEYS.USER_CARS, userCarsData, CACHE_TTL.MEDIUM);
        return userCarsData;
    }
    
    // Mock data for now - replace with actual API call
    const userCarsData = [];
    
    // Cache user cars for 5 minutes
    cache.set(CACHE_KEYS.USER_CARS, userCarsData, CACHE_TTL.MEDIUM);
    return userCarsData;
};

/**
 * Clear all cached data
 * Use this when you need to force fresh data (e.g., after adding a new car)
 */
export const clearCache = () => {
    cache.clear();
};

/**
 * Clear specific cache key
 * @param {string} key - Cache key to clear
 */
export const clearCacheKey = (key) => {
    cache.delete(key);
};

/**
 * Get cache statistics
 * @returns {object} - Cache stats
 */
export const getCacheStats = () => {
    return cache.getStats();
};

const api = {
    fetchVehicles,
    fetchAllCars,
    fetchNewVehicles,
    getVehicleById,
    fetchUserProfile,
    fetchUserCars,
    clearCache,
    clearCacheKey,
    getCacheStats
};

export default api;